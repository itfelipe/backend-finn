import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { updateTransaction } from "../../controllers/transactions/update";
import { createTransaction } from "../../controllers/transactions/create";
import { getTransactions } from "../../controllers/transactions/get";
import { deleteTransaction } from "../../controllers/transactions/delete";
import { getTransactionsSummary } from "../../controllers/transactions/summary";
import { getTransactionById } from "../../controllers/transactions/getById";

const router = Router();

router.post("/", verifyToken, createTransaction);
router.get("/", verifyToken, getTransactions);
router.put("/:id", verifyToken, updateTransaction);
router.delete("/:id", verifyToken, deleteTransaction);
router.get("/summary", verifyToken, getTransactionsSummary);
router.get("/:id", verifyToken, getTransactionById);

export default router;
