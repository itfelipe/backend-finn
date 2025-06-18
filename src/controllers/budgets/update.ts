import { Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const updateBudget = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const userId = Number(req.userId);
    const budgetId = Number(id);

    const budget = await prisma.budget.updateMany({
      where: { id: budgetId, userId },
      data: req.body,
    });

    if (budget.count === 0) {
      res
        .status(404)
        .json({ error: "Orçamento não encontrado ou não pertence ao usuário" });
      return;
    }

    res.status(200).json({ message: "Orçamento atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar orçamento" });
  }
};
