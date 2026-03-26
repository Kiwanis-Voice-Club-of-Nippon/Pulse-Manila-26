import 'dotenv/config';

import {GoogleGenAI} from '@google/genai';
import express from 'express';
import fs from 'fs';
import path from 'path';
import {createServer as createViteServer} from 'vite';

import {
  CONVENTION_DAYS,
  FAQS,
  SESSIONS,
  UPDATES,
  VENUE_LOCATIONS,
} from './src/mockData.ts';

const PORT = Number(process.env.PORT ?? 3000);
const MODEL = process.env.GOOGLE_GENAI_MODEL ?? 'gemini-2.5-flash';
const FEEDBACK_FILE_PATH = path.join(process.cwd(), 'feedback.json');

function getAiMode(): 'vertex' | 'apiKey' | 'disabled' {
  const useVertex =
    process.env.GOOGLE_GENAI_USE_VERTEXAI?.toLowerCase() === 'true' &&
    process.env.GOOGLE_CLOUD_PROJECT;

  if (useVertex) {
    return 'vertex';
  }

  if (process.env.GEMINI_API_KEY) {
    return 'apiKey';
  }

  return 'disabled';
}

function createAiClient(): GoogleGenAI | null {
  const mode = getAiMode();

  if (mode === 'vertex') {
    return new GoogleGenAI({
      vertexai: true,
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION ?? 'global',
      apiVersion: 'v1',
    });
  }

  if (mode === 'apiKey') {
    return new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return null;
}

function buildConventionContext() {
  const days = CONVENTION_DAYS.map(
    (day) => `- ${day.fullLabel}: ${day.homeLabel}`,
  ).join('\n');

  const sessions = SESSIONS.map(
    (session) =>
      `- ${session.day} ${session.time}-${session.endTime} | ${session.title} | ${session.room} | ${session.venue} | ${session.category.join(', ')}`,
  ).join('\n');

  const updates = UPDATES.map(
    (update) => `- ${update.title}: ${update.content}`,
  ).join('\n');

  const venues = VENUE_LOCATIONS.map(
    (venue) =>
      `- ${venue.name} (${venue.floor}, ${venue.hall}): ${venue.description} ${venue.note}`,
  ).join('\n');

  const faqs = FAQS.map(
    (faq) => `- [${faq.category}] ${faq.question}: ${faq.answer}`,
  ).join('\n');

  return [
    'Convention days:',
    days,
    '',
    'Sessions:',
    sessions,
    '',
    'Updates:',
    updates,
    '',
    'Venue information:',
    venues,
    '',
    'FAQ:',
    faqs,
  ].join('\n');
}

const CONVENTION_CONTEXT = buildConventionContext();
const ASSISTANT_SYSTEM_INSTRUCTION = `
You are Pulse, the Kiwanis ASPAC Manila 2026 convention helper.

Rules:
- Answer only using the provided convention context.
- Keep answers short, practical, and senior-friendly.
- Use the same language as the attendee when possible.
- Prefer simple directions, exact times, room names, and next-step guidance.
- If the answer is not in the context, say you are not sure and direct the attendee to the Help Desk near Registration.
- Never invent transport, ticketing, or official policy details.
`.trim();

function readFeedbackFile() {
  if (!fs.existsSync(FEEDBACK_FILE_PATH)) {
    return [];
  }

  try {
    return JSON.parse(fs.readFileSync(FEEDBACK_FILE_PATH, 'utf-8'));
  } catch (error) {
    console.error('Error reading feedback file', error);
    return [];
  }
}

function persistFeedback(payload: Record<string, unknown>) {
  const entry = {
    ...payload,
    timestamp: new Date().toISOString(),
  };

  console.log('pulse_feedback', JSON.stringify(entry));

  if (process.env.NODE_ENV === 'production') {
    return entry;
  }

  const currentFeedback = readFeedbackFile();
  currentFeedback.push(entry);
  fs.writeFileSync(FEEDBACK_FILE_PATH, JSON.stringify(currentFeedback, null, 2));

  return entry;
}

async function startServer() {
  const app = express();

  app.use(express.json({limit: '1mb'}));

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      aiMode: getAiMode(),
      model: MODEL,
    });
  });

  app.post('/api/feedback', (req, res) => {
    const entry = persistFeedback(req.body);

    res.json({
      status: 'success',
      message: 'Feedback saved successfully',
      storedInLogs: process.env.NODE_ENV === 'production',
      entry,
    });
  });

  app.post('/api/assistant', async (req, res) => {
    const question =
      typeof req.body?.question === 'string' ? req.body.question.trim() : '';

    if (!question) {
      return res.status(400).json({error: 'A question is required.'});
    }

    const ai = createAiClient();
    if (!ai) {
      return res.status(503).json({
        error:
          'Pulse assistant is not configured yet. Add Vertex or Gemini credentials to enable it.',
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: `Convention context:\n${CONVENTION_CONTEXT}\n\nAttendee question:\n${question}`,
        config: {
          systemInstruction: ASSISTANT_SYSTEM_INSTRUCTION,
          temperature: 0.2,
          maxOutputTokens: 400,
        },
      });

      const answer = response.text?.trim();
      if (!answer) {
        return res.status(502).json({
          error: 'Pulse assistant did not return an answer.',
        });
      }

      return res.json({
        answer,
        model: MODEL,
        mode: getAiMode(),
      });
    } catch (error) {
      console.error('Assistant request failed', error);
      return res.status(500).json({
        error:
          'Pulse assistant is temporarily unavailable. Please try again or visit the Help Desk.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
