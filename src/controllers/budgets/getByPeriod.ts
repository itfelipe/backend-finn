import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const getBudgetsByPeriod = async (req: AuthRequest, res: Response) => {
  const { start, end } = req.query;

  if (!req.userId) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  if (typeof start !== "string" || typeof end !== "string") {
    res
      .status(400)
      .json({ error: "Parâmetros 'start' e 'end' são obrigatórios." });
    return;
  }

  try {
    const budgets = await prisma.budget.findMany({
      where: {
        userId: Number(req.userId),
        month: {
          gte: start,
          lte: end,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        month: "desc",
      },
    });

    res.status(200).json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar budgets por período." });
  }
};
