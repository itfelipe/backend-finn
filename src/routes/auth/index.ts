import { Router } from "express";
import { getProfile, login, register } from "../../controllers";
import { verifyToken } from "../../middlewares/verifyToken";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getProfile);

export default router;
