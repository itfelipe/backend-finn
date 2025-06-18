import { Request, Response, NextFunction } from "express";
import { createBudgetSchema, updateBudgetSchema } from "../schemas/budget";

const validateBudget = (req: Request, res: Response, next: NextFunction) => {
  const parsed = createBudgetSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  req.body = parsed.data;
  next();
};

const validateBudgetUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsed = updateBudgetSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }
  req.body = parsed.data;
  next();
};

export { validateBudget, validateBudgetUpdate };
