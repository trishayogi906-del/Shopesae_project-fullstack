import { Router } from "express";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middelware/authMiddleware.js";
import { uploadProductImage } from "../middelware/uploadMiddleware.js";

const router = Router();

router
    .route("/")
    .get(getProducts)
    .post(protect, adminOnly, uploadProductImage, createProduct);

router
    .route("/:id")
    .get(getProduct)
    .put(protect, adminOnly, uploadProductImage, updateProduct)
    .delete(protect, adminOnly, deleteProduct);

export default router;
