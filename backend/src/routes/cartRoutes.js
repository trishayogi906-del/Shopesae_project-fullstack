import { Router } from "express";
import { getCart, saveCart } from "../controllers/cartController.js";
import { protect } from "../middelware/authMiddleware.js";

const router = Router();

router.use(protect);
router.get("/", getCart);
router.put("/", saveCart);

export default router;
