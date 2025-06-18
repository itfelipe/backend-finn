import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const getAllBudgets = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const budgets = await prisma.budget.findMany({
      where: { userId: Number(userId) },
      orderBy: { month: "desc" },
    });

    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
};
