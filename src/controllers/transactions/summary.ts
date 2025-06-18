import { Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const getTransactionsSummary = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = Number(req.userId);

    const entrada = await prisma.transaction.aggregate({
      where: { userId, type: "entrada" },
      _sum: { amount: true },
    });

    const saida = await prisma.transaction.aggregate({
      where: { userId, type: "saida" },
      _sum: { amount: true },
    });

    const totalEntradas = entrada._sum.amount || 0;
    const totalSaidas = saida._sum.amount || 0;
    const saldo = totalEntradas - totalSaidas;

    res.status(200).json({
      entradas: totalEntradas,
      saidas: totalSaidas,
      saldo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar resumo financeiro." });
  }
};
