import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateToken, cookieOptions } from "../utils/generateToken.js";
import { str, isEmail } from "../utils/validators.js";

const sendUser = (res, user, status = 200) => {
    generateToken(res, user._id);
    res.status(status).json({ user });
};

export const register = asyncHandler(async (req, res) => {
    const name = str(req.body.name);
    const email = str(req.body.email).toLowerCase();
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (!name) throw new AppError(400, "Enter your name");
    if (!isEmail(email)) throw new AppError(400, "Enter a valid email");
    if (password.length < 6) throw new AppError(400, "Password must be at least 6 characters");
    if (await User.exists({ email })) {
        throw new AppError(409, "An account with this email already exists");
    }

    const user = await User.create({ name, email, password });
    sendUser(res, user, 201);
});

export const login = asyncHandler(async (req, res) => {
    const email = str(req.body.email).toLowerCase();
    const password = typeof req.body.password === "string" ? req.body.password : "";

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
        throw new AppError(401, "Invalid email or password");
    }

    sendUser(res, user);
});

export const logout = (req, res) => {
    res.clearCookie("token", cookieOptions());
    res.json({ message: "Logged out" });
};

export const getMe = (req, res) => res.json({ user: req.user });
