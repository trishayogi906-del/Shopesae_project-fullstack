import { Router } from "express";
import { createOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middelware/authMiddleware.js";

const router = Router();

router.use(protect);
router.post("/", createOrder);
router.get("/my", getMyOrders); // keep above "/:id"
router.get("/:id", getOrderById);

export default router;
