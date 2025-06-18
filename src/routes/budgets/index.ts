import { Router } from "express";
import { createBudget } from "../../controllers/budgets/create";
import { getAllBudgets } from "../../controllers/budgets/getAll";
import { verifyToken } from "../../middlewares/verifyToken";
import {
  validateBudget,
  validateBudgetUpdate,
} from "../../middlewares/verifyBudget";
import { updateBudget } from "../../controllers/budgets/update";
import { deleteBudget } from "../../controllers/budgets/delete";
import { getBudgetsByPeriod } from "../../controllers/budgets/getByPeriod";

const router = Router();

router.post("/", verifyToken, validateBudget, createBudget);
router.get("/", verifyToken, getAllBudgets);
router.put("/:id", verifyToken, validateBudgetUpdate, updateBudget);
router.delete("/:id", verifyToken, deleteBudget);

router.get("/by-period", verifyToken, getBudgetsByPeriod);
export default router;
