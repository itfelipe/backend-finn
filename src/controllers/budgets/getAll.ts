import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const getAllBudgets = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const budgets = await prisma.budget.findMany({
      where: { userId: Number(userId) },
      orderBy: { month: "desc" },
      include: {
        category: true,
      },
    });

    const budgetsWithTotal = await Promise.all(
      budgets.map(async (budget) => {
        const totalUsed = await prisma.transaction.aggregate({
          where: {
            userId: Number(userId),
            categoryId: budget.categoryId,
            createdAt: {
              gte: new Date(`${budget.month}-01T00:00:00Z`),
              lt: new Date(`${budget.month}-31T23:59:59Z`),
            },
          },
          _sum: {
            amount: true,
          },
        });

        return {
          ...budget,
          totalUsed: totalUsed._sum.amount || 0,
        };
      })
    );

    res.status(200).json(budgetsWithTotal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
};
