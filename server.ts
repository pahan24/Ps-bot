import express from "express";
import { createServer as createViteServer } from "vite";
import app from "./src/app"; // Import the Express app
import { connectDB } from "./src/config/db";
import { logger } from "./src/utils/logger";

async function startServer() {
  const PORT = 3000; // Hardcoded as per platform requirements

  // Connect to Database
  await connectDB();

  // Vite middleware for development (Frontend)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    // Mount Vite middleware
    // Since app.ts defines API routes, we mount Vite after them.
    // Requests not handled by API will fall through to Vite.
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info(`Webhook URL: ${process.env.APP_URL}/api/webhook`);
  });
}

startServer();
