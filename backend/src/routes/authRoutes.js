import { Router } from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import { protect } from "../middelware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;
