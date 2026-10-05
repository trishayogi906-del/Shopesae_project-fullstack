import fs from "fs";
import path from "path";
import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { str } from "../utils/validators.js";
import { categories } from "../config/categories.js";
import { uploadsDir } from "../middelware/uploadMiddleware.js";

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const fileUrl = (req) =>
    `${process.env.SERVER_URL || `${req.protocol}://${req.get("host")}`}/uploads/${req.file.filename}`;

// delete the old image only if it was uploaded to this server
function removeLocalImage(image) {
    if (!image || !image.includes("/uploads/")) return;
    fs.unlink(path.join(uploadsDir, path.basename(image)), () => { });
}

function readFields(req) {
    const b = req.body;
    const data = {};
    if (b.title !== undefined) data.title = str(b.title);
    if (b.description !== undefined) data.description = str(b.description);
    if (b.category !== undefined) data.category = str(b.category);
    ["price", "mrp", "rating", "stock"].forEach((k) => {
        if (b[k] !== undefined && b[k] !== "") data[k] = Number(b[k]);
    });
    if (req.file) data.image = fileUrl(req);
    else if (b.image !== undefined) data.image = str(b.image);
    return data;
}

export const getProducts = asyncHandler(async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 12, 1), 50);

    const filter = {};
    const category = str(req.query.category);
    const q = str(req.query.q);
    if (category && category !== "all") filter.category = category;
    if (q) filter.title = { $regex: escapeRegex(q), $options: "i" };

    const [products, total] = await Promise.all([
        Product.find(filter)
            .sort({ _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        Product.countDocuments(filter),
    ]);

    res.json({ products, page, pages: Math.ceil(total / limit), total });
});

export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw new AppError(404, "Product not found");
    res.json({ product });
});

export const getCategories = (req, res) => res.json({ categories });

export const createProduct = asyncHandler(async (req, res) => {
    const data = readFields(req);
    if (data.mrp === undefined) data.mrp = data.price;
    const product = await Product.create(data);
    res.status(201).json({ product });
});

export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw new AppError(404, "Product not found");

    const data = readFields(req);
    if (req.file) removeLocalImage(product.image);

    Object.assign(product, data);
    await product.save();
    res.json({ product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new AppError(404, "Product not found");
    removeLocalImage(product.image);
    res.json({ message: "Product deleted" });
});
