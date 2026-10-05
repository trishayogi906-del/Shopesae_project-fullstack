import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { notFound, errorHandler } from "./middelware/errorMiddleware.js";
import { uploadsDir } from "./middelware/uploadMiddleware.js";

const app = express();

const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/+$/, "");

app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
