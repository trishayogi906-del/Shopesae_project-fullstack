import jwt from "jsonwebtoken";

const isProd = () => process.env.NODE_ENV === "production";

export const cookieOptions = () => ({
    httpOnly: true,
    secure: isProd(),
    // frontend and backend on different domains in production need "none" (+ secure)
    sameSite: isProd() ? "none" : "lax",
});

export function generateToken(res, userId) {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { ...cookieOptions(), maxAge: 7 * 24 * 60 * 60 * 1000 });
}
