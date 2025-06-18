import { Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";
import dayjs from "dayjs";

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

    if (type === "saida") {
      const currentMonth = dayjs().format("YYYY-MM");

      await prisma.budget.updateMany({
        where: {
          userId: Number(req.userId),
          categoryId,
          month: currentMonth,
        },
        data: {
          totalUsed: {
            increment: amount,
          },
        },
      });
    }

    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar transação." });
  }
};
