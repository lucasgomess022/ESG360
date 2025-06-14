import { 
  users, 
  evaluations, 
  type User, 
  type UpsertUser, 
  type Evaluation, 
  type InsertEvaluation 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, sql, count, avg } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // ESG Evaluation operations
  createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  getEvaluations(filters?: { search?: string; period?: string }): Promise<Evaluation[]>;
  getEvaluation(id: number): Promise<Evaluation | undefined>;
  getEvaluationStats(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User operations for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // ESG Evaluation operations
  async createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation> {
    const [createdEvaluation] = await db
      .insert(evaluations)
      .values(evaluation)
      .returning();
    return createdEvaluation;
  }

  async getEvaluations(filters?: { search?: string; period?: string }): Promise<Evaluation[]> {
    let query = db.select().from(evaluations);
    
    if (filters?.search) {
      query = query.where(ilike(evaluations.propertyName, `%${filters.search}%`));
    }
    
    if (filters?.period && filters.period !== 'all') {
      const now = new Date();
      let dateFilter: Date;
      
      switch (filters.period) {
        case 'month':
          dateFilter = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          dateFilter = new Date(now.getFullYear(), now.getMonth() - 3, 1);
          break;
        case 'year':
          dateFilter = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          dateFilter = new Date(0);
      }
      
      query = query.where(sql`${evaluations.submissionDate} >= ${dateFilter}`);
    }
    
    return query.orderBy(desc(evaluations.submissionDate));
  }

  async getEvaluation(id: number): Promise<Evaluation | undefined> {
    const [evaluation] = await db
      .select()
      .from(evaluations)
      .where(eq(evaluations.id, id));
    return evaluation;
  }

  async getEvaluationStats(): Promise<any> {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const [totalStats] = await db
      .select({
        totalEvaluations: count(),
        uniqueProperties: sql<number>`COUNT(DISTINCT ${evaluations.propertyName})`,
        avgEnvironmentalScore: avg(evaluations.environmentalScore),
      })
      .from(evaluations);

    const [monthStats] = await db
      .select({
        thisMonth: count(),
      })
      .from(evaluations)
      .where(sql`${evaluations.submissionDate} >= ${thisMonth}`);

    return {
      totalEvaluations: totalStats.totalEvaluations || 0,
      uniqueProperties: totalStats.uniqueProperties || 0,
      avgEnvironmentalScore: Math.round(Number(totalStats.avgEnvironmentalScore) || 0),
      thisMonth: monthStats.thisMonth || 0,
    };
  }
}

export const storage = new DatabaseStorage();