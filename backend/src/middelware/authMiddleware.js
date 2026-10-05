import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
    const header = req.headers.authorization;
    const token = req.cookies?.token || (header?.startsWith("Bearer ") ? header.split(" ")[1] : null);
    if (!token) throw new AppError(401, "Please log in to continue");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new AppError(401, "Account not found. Please log in again");

    req.user = user;
    next();
});

export const adminOnly = (req, res, next) =>
    req.user?.role === "admin" ? next() : next(new AppError(403, "Admin access only"));
