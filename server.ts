import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/feedback", (req, res) => {
    const feedback = req.body;
    const feedbackPath = path.join(process.cwd(), "feedback.json");
    
    let currentFeedback = [];
    if (fs.existsSync(feedbackPath)) {
      try {
        currentFeedback = JSON.parse(fs.readFileSync(feedbackPath, "utf-8"));
      } catch (e) {
        console.error("Error reading feedback file", e);
      }
    }
    
    currentFeedback.push({
      ...feedback,
      timestamp: new Date().toISOString()
    });
    
    fs.writeFileSync(feedbackPath, JSON.stringify(currentFeedback, null, 2));
    console.log("Feedback received and saved:", feedback);
    res.json({ status: "success", message: "Feedback saved successfully" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
