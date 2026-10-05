import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Pulls real products + images from DummyJSON and stores them in your own database.
const USD_TO_INR = 85;
const sources = {
    men: ["mens-shirts", "mens-watches"],
    women: ["womens-dresses", "womens-bags"],
    electronics: ["smartphones", "laptops"],
    shoes: ["mens-shoes", "womens-shoes"],
    beauty: ["beauty", "skin-care"],
};

async function fetchCategory(slug) {
    const res = await fetch(`https://dummyjson.com/products/category/${slug}?limit=10`);
    if (!res.ok) throw new Error(`Couldn't fetch "${slug}" from DummyJSON`);
    return (await res.json()).products;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

async function seedProducts() {
    const docs = [];
    for (const [category, slugs] of Object.entries(sources)) {
        for (const slug of slugs) {
            const list = await fetchCategory(slug);
            for (const p of list) {
                const price = Math.round(p.price * USD_TO_INR);
                docs.push({
                    title: p.title,
                    description: p.description,
                    image: p.thumbnail,
                    category,
                    price,
                    mrp: Math.round(price / (1 - p.discountPercentage / 100)),
                    rating: p.rating,
                    stock: p.stock,
                });
            }
        }
    }
    await Product.deleteMany({});
    await Product.insertMany(shuffle(docs)); // shuffled so "all" shows a mix of categories
    console.log(`${docs.length} products seeded`);
}

async function seedAdmin() {
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        return console.log("Admin skipped (set ADMIN_EMAIL and ADMIN_PASSWORD in .env)");
    }
    const email = ADMIN_EMAIL.toLowerCase();
    if (await User.exists({ email })) return console.log("Admin already exists");
    await User.create({ name: "Admin", email, password: ADMIN_PASSWORD, role: "admin" });
    console.log(`Admin created: ${email}`);
}

try {
    await connectDB();
    await seedProducts();
    await seedAdmin();
} catch (err) {
    console.error(err.message);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
