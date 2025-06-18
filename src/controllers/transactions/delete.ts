import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (!req.userId) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    if (!transaction || transaction.userId !== Number(req.userId)) {
      res.status(404).json({ error: "Transação não encontrada." });
      return;
    }

    const categoryId = transaction.categoryId;

    await prisma.transaction.delete({
      where: { id: Number(id) },
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
        _sum: { amount: true },
      });

      await prisma.budget.update({
        where: { id: budget.id },
        data: {
          totalUsed: totalUsed._sum.amount || 0,
        },
      });
    }

    res.status(200).json({ message: "Transação deletada com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar transação." });
  }
};
