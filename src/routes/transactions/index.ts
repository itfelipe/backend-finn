import { Router } from "express";
import {
  createTransaction,
  getTransactions,
} from "../../controllers/transactions";
import { verifyToken } from "../../middlewares/verifyToken";

const router = Router();

router.post("/", verifyToken, createTransaction);
router.get("/", verifyToken, getTransactions);

export default router;
