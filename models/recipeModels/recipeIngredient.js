import mongoose from "mongoose";

export const recipeIngredient = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    unit_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: 1,
    },
});
