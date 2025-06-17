import { Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const getTransactions = async (req: AuthRequest, res: Response) => {
  const { type, start, end } = req.query;

  if (!req.userId) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  const filters: any = {
    userId: Number(req.userId),
  };

  if (type && typeof type === "string") {
    filters.type = type;
  }

  if (start && end && typeof start === "string" && typeof end === "string") {
    filters.createdAt = {
      gte: new Date(start),
      lte: new Date(end),
    };
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
    });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar transações." });
  }
};
