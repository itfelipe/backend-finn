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

const router = Router();

router.post("/", verifyToken, validateBudget, createBudget);
router.get("/", verifyToken, getAllBudgets);
router.put("/:id", verifyToken, validateBudgetUpdate, updateBudget);
router.delete("/:id", verifyToken, deleteBudget);
export default router;
