import { Router } from "express";
import authRoutes from "./auth";
import transactionRoutes from "./transactions";
import budgetRoutes from "./budgets";

const router = Router();

router.use("/auth", authRoutes);
router.use("/transactions", transactionRoutes);
router.use("/budgets", budgetRoutes);

export default router;
