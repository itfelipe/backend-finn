import { z } from "zod";

export const createBudgetSchema = z.object({
  categoryId: z.number().int().positive(),
  limit: z.number().positive(),
  month: z.string().min(1),
});

export const updateBudgetSchema = z.object({
  categoryId: z.number().int().positive().optional(),
  limit: z.number().positive().optional(),
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(),
});
