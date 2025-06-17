import { Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const createTransaction = async (req: AuthRequest, res: Response) => {
  const { title, amount, type, categoryId } = req.body;

  if (!req.userId) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        title,
        categoryId,
        amount,
        type,
        userId: Number(req.userId),
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar transação." });
  }
};
