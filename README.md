# Pulse Manila 2026

Public, mobile-first Kiwanis convention companion for ASPAC Manila 2026.

Pulse is designed to help delegates quickly find:

- today’s schedule
- saved sessions
- updates and announcements
- venue guidance
- practical attendee help

Pulse complements official convention information. It does not replace official notices, signage, or stage announcements.

## Run locally

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local`
3. Start the local server:
   `npm run dev`
4. Open:
   [http://localhost:3000](http://localhost:3000)

## Vertex AI and Cloud Run

- The server supports both `GEMINI_API_KEY` and Vertex AI via `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`, and `GOOGLE_GENAI_USE_VERTEXAI`.
- Feedback submissions are written to `feedback.json` locally and to Cloud Run logs in production.
- The attendee assistant is exposed at `POST /api/assistant` and answers using convention data only.
- `npm run start` serves the Express app, and the included `Dockerfile` is ready for Cloud Run.
- `npm run deploy:cloudrun` deploys this repo to Cloud Run in `us-west1`.

## Scripts

- `npm run dev` starts the Express + Vite dev server on port `3000`
- `npm run start` starts the server for production
- `npm run build` creates a production build with Vite
- `npm run lint` runs TypeScript type-checking
- `npm run deploy:cloudrun` deploys the service to Cloud Run
