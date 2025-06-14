import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ESG Evaluations table
export const evaluations = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  propertyName: varchar("property_name").notNull(),
  submissionDate: timestamp("submission_date").defaultNow(),
  answers: jsonb("answers").notNull(), // Store all 41 answers as JSON
  environmentalScore: integer("environmental_score").notNull(),
  socialScore: integer("social_score").notNull(),
  governanceScore: integer("governance_score").notNull(),
  environmentalClassification: varchar("environmental_classification").notNull(),
  socialClassification: varchar("social_classification").notNull(),
  governanceClassification: varchar("governance_classification").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const insertEvaluationSchema = createInsertSchema(evaluations).pick({
  propertyName: true,
  answers: true,
  environmentalScore: true,
  socialScore: true,
  governanceScore: true,
  environmentalClassification: true,
  socialClassification: true,
  governanceClassification: true,
});

export type InsertEvaluation = z.infer<typeof insertEvaluationSchema>;
export type Evaluation = typeof evaluations.$inferSelect;
