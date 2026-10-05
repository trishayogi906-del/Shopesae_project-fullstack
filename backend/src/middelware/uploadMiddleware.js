import multer from "multer";
import path from "path";
import fs from "fs";
import AppError from "../utils/AppError.js";

export const uploadsDir = path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
});

const fileFilter = (req, file, cb) =>
    ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)
        ? cb(null, true)
        : cb(new AppError(400, "Only JPG, PNG or WebP images are allowed"));

export const uploadProductImage = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
}).single("image");
