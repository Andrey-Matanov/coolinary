import mongoose from "mongoose";
import { recipeCommentary } from "./recipeCommentary";
import { recipeIngredient } from "./recipeIngredient";
import { recipeStep } from "./recipeStep";

const recipe = new mongoose.Schema({
    authorId: {
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
        default: "https://via.placeholder.com/150x150",
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
    rating: {
        type: Number,
        default: 0,
    },
    ingredients: [recipeIngredient],
    steps: [recipeStep],
    commentaries: [recipeCommentary],
});

const Recipe = mongoose.model("recipes", recipe);

export default Recipe;
