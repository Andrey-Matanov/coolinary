import mongoose from "mongoose";

export const recipeStep = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/150x150",
    },
});
