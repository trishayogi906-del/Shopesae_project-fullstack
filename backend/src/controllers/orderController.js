import mongoose from "mongoose";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { str, isPhone, isPincode } from "../utils/validators.js";

const DELIVERY_FEE = 40;
const PAYMENT_METHODS = ["cod", "online"];

export const createOrder = asyncHandler(async (req, res) => {
    const { items, address, paymentMethod } = req.body;

    if (!Array.isArray(items) || !items.length) throw new AppError(400, "Your cart is empty");
    if (!PAYMENT_METHODS.includes(paymentMethod)) throw new AppError(400, "Choose a payment method");

    const addr = {
        name: str(address?.name),
        phone: str(address?.phone),
        address: str(address?.address),
        city: str(address?.city),
        pincode: str(address?.pincode),
    };
    if (!addr.name || !addr.address || !addr.city) {
        throw new AppError(400, "Fill in your full delivery address");
    }
    if (!isPhone(addr.phone)) throw new AppError(400, "Enter a 10-digit phone number");
    if (!isPincode(addr.pincode)) throw new AppError(400, "Enter a 6-digit pincode");

    // merge duplicate products; the client only sends productId + qty
    const wanted = new Map();
    for (const item of items) {
        const id = str(item?.productId);
        const qty = Number(item?.qty);
        if (!mongoose.isValidObjectId(id) || !Number.isInteger(qty) || qty < 1 || qty > 20) {
            throw new AppError(400, "Invalid item in your cart");
        }
        wanted.set(id, (wanted.get(id) || 0) + qty);
    }

    // prices always come from the database, never from the client
    const products = await Product.find({ _id: { $in: [...wanted.keys()] } });
    if (products.length !== wanted.size) {
        throw new AppError(400, "Some products are no longer available");
    }

    const orderItems = products.map((p) => {
        const qty = wanted.get(p.id);
        if (qty > p.stock) throw new AppError(400, `Only ${p.stock} left of "${p.title}"`);
        return { product: p._id, title: p.title, image: p.image, price: p.price, qty };
    });

    const itemsTotal = orderItems.reduce((n, i) => n + i.price * i.qty, 0);
    const order = await Order.create({
        user: req.user._id,
        items: orderItems,
        address: addr,
        paymentMethod,
        itemsTotal,
        deliveryFee: DELIVERY_FEE,
        total: itemsTotal + DELIVERY_FEE,
    });

    await Product.bulkWrite(
        orderItems.map((i) => ({
            updateOne: { filter: { _id: i.product }, update: { $inc: { stock: -i.qty } } },
        }))
    );

    await Cart.deleteOne({ user: req.user._id }); // order placed, so empty the saved cart

    res.status(201).json({ order });
});

export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
});

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) throw new AppError(404, "Order not found");

    const isOwner = order.user.toString() === req.user.id;
    if (!isOwner && req.user.role !== "admin") throw new AppError(403, "Not allowed");

    res.json({ order });
});
