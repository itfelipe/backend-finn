import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const updateTransaction = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, amount, type, categoryId } = req.body;

  if (!req.userId) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  try {
    const transaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        title,
        amount,
        type,
        categoryId,
      },
    });

    const budget = await prisma.budget.findFirst({
      where: {
        userId: Number(req.userId),
        categoryId: categoryId,
      },
    });

    if (budget) {
      const totalUsed = await prisma.transaction.aggregate({
        where: {
          userId: Number(req.userId),
          categoryId: categoryId,
        },
        _sum: {
          amount: true,
        },
      });

      await prisma.budget.update({
        where: { id: budget.id },
        data: {
          totalUsed: totalUsed._sum.amount || 0,
        },
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar transação." });
  }
};
