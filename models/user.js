import mongoose from "mongoose";

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
});

mongoose.models = {};

const User = mongoose.model("users", user);

export default User;
