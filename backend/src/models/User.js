import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { toJSONOptions } from "../utils/toJSONOptions.js";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Name is required"], trim: true },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true, minlength: 6, select: false },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

userSchema.set("toJSON", toJSONOptions);

export default mongoose.model("User", userSchema);
