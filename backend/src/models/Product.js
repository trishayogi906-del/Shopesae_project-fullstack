import mongoose from "mongoose";
import { categories } from "../config/categories.js";
import { toJSONOptions } from "../utils/toJSONOptions.js";

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: [true, "Product title is required"], trim: true },
        description: { type: String, trim: true, default: "" },
        image: { type: String, required: [true, "Product image is required"] },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: { values: categories.map((c) => c.slug), message: "Invalid category" },
        },
        price: { type: Number, required: [true, "Price is required"], min: [1, "Price must be at least 1"] },
        mrp: { type: Number, required: [true, "MRP is required"], min: [1, "MRP must be at least 1"] },
        rating: { type: Number, min: 0, max: 5, default: 0 },
        stock: { type: Number, min: [0, "Stock can't be negative"], default: 0 },
    },
    { timestamps: true }
);

productSchema.index({ category: 1 });
productSchema.set("toJSON", toJSONOptions);

export default mongoose.model("Product", productSchema);
