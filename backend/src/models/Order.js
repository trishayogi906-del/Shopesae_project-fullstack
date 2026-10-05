import mongoose from "mongoose";
import { toJSONOptions } from "../utils/toJSONOptions.js";

const itemSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        title: { type: String, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        qty: { type: Number, required: true, min: 1 },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: { type: [itemSchema], required: true },
        address: {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        paymentMethod: { type: String, enum: ["cod", "online"], required: true },
        itemsTotal: { type: Number, required: true },
        deliveryFee: { type: Number, required: true },
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["placed", "shipped", "delivered", "cancelled"],
            default: "placed",
        },
    },
    { timestamps: true }
);

orderSchema.set("toJSON", toJSONOptions);

export default mongoose.model("Order", orderSchema);
