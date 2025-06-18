import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const getTransactionById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: Number(id),
        userId: Number(req.userId),
      },
    });

    if (!transaction) {
      res.status(404).json({ error: "Transação não encontrada." });
      return;
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar transação." });
  }
};
