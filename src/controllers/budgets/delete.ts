import { Response } from "express";
import prisma from "../../prisma/client";
import { AuthRequest } from "../../middlewares/verifyToken";

export const deleteBudget = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const userId = Number(req.userId);
    const budgetId = Number(id);

    const deleted = await prisma.budget.deleteMany({
      where: { id: budgetId, userId },
    });

    if (deleted.count === 0) {
      res
        .status(404)
        .json({ error: "Orçamento não encontrado ou não pertence ao usuário" });
      return;
    }

    res.status(200).json({ message: "Orçamento removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar orçamento" });
  }
};
