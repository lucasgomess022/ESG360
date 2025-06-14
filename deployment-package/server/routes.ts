import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertEvaluationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // ESG Evaluation routes
  app.post('/api/evaluations', async (req, res) => {
    try {
      const validatedData = insertEvaluationSchema.parse(req.body);
      const evaluation = await storage.createEvaluation(validatedData);
      res.status(201).json(evaluation);
    } catch (error) {
      console.error("Error creating evaluation:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create evaluation" });
      }
    }
  });

  app.get('/api/evaluations', isAuthenticated, async (req, res) => {
    try {
      const { search, period } = req.query;
      const evaluations = await storage.getEvaluations({
        search: search as string,
        period: period as string,
      });
      res.json(evaluations);
    } catch (error) {
      console.error("Error fetching evaluations:", error);
      res.status(500).json({ message: "Failed to fetch evaluations" });
    }
  });

  app.get('/api/evaluations/stats', isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getEvaluationStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching evaluation stats:", error);
      res.status(500).json({ message: "Failed to fetch evaluation stats" });
    }
  });

  app.get('/api/evaluations/:id', isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid evaluation ID" });
      }
      const evaluation = await storage.getEvaluation(id);
      if (!evaluation) {
        return res.status(404).json({ message: "Evaluation not found" });
      }
      res.json(evaluation);
    } catch (error) {
      console.error("Error fetching evaluation:", error);
      res.status(500).json({ message: "Failed to fetch evaluation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
