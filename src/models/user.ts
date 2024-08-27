import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
        default: "user",
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);