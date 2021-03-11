import mongoose from "mongoose";

const ingredient = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    unitId: {
        type: Number,
        required: true,
    },
    fat: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    carb: {
        type: Number,
        required: true,
    },
    callories: {
        type: Number,
        required: true,
    },
});

mongoose.models = {};

const Ingredient = mongoose.model("ingredients", ingredient);

export default Ingredient;
