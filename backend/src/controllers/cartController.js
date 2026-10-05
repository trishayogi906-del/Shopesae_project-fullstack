import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import { str } from "../utils/validators.js";

// shape the cart the way the frontend already uses it: { id, title, image, price, qty }
const format = (cart) =>
    (cart?.items || [])
        .filter((i) => i.product) // product may have been deleted by admin
        .map((i) => ({
            id: i.product._id.toString(),
            title: i.product.title,
            image: i.product.image,
            price: i.product.price,
            qty: i.qty,
        }));

export const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.json({ items: format(cart) });
});

// replaces the whole cart with what the frontend sends: [{ productId, qty }]
export const saveCart = asyncHandler(async (req, res) => {
    const incoming = Array.isArray(req.body.items) ? req.body.items : [];

    const wanted = new Map();
    for (const item of incoming) {
        const id = str(item?.productId);
        const qty = Math.min(Number(item?.qty), 20);
        if (!mongoose.isValidObjectId(id) || !Number.isInteger(qty) || qty < 1) continue;
        wanted.set(id, Math.min((wanted.get(id) || 0) + qty, 20));
    }

    // keep only products that really exist
    const found = await Product.find({ _id: { $in: [...wanted.keys()] } }).select("_id");
    const items = found.map((p) => ({ product: p._id, qty: wanted.get(p.id) }));

    const cart = await Cart.findOneAndUpdate(
        { user: req.user._id },
        { items },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    ).populate("items.product");

    res.json({ items: format(cart) });
});
