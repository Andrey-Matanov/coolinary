import mongoose from "mongoose";

const recipe = new mongoose.Schema({
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
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    ingredients: [
        {
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
                required: true,
            },
        },
    ],
    steps: [
        {
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
                required: true,
            },
        },
    ],
    commentaries: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            authorId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            content: {
                type: String,
                reqired: true,
            },
        },
    ],
});

const Recipe = mongoose.model("recipes", recipe);

export default Recipe;
