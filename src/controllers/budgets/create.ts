import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const createBudget = async (req: AuthRequest, res: Response) => {
  const { categoryId, limit, month } = req.body;

  if (!req.userId) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  try {
    const budget = await prisma.budget.create({
      data: {
        categoryId,
        limit,
        month,
        userId: Number(req.userId),
      },
    });

    res.status(201).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar orçamento." });
  }
};
