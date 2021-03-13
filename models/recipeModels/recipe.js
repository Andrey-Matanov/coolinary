import mongoose from "mongoose";
import { recipeCommentary } from "./recipeCommentary";
import { recipeIngredient } from "./recipeIngredient";
import { recipeStep } from "./recipeStep";

const recipe = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [recipeIngredient],
    steps: [recipeStep],
    commentaries: [recipeCommentary],
});

const Recipe = mongoose.model("recipes", recipe);

export default Recipe;
