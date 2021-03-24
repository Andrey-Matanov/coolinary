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
    authorName: {
        type: String,
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
            _id: false,
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
            _id: false,
        },
    ],
    commentaries: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            user_name: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                reqired: true,
            },
            _id: false,
        },
    ],
});

mongoose.models = {};

const Recipe = mongoose.model("recipes", recipe);

export default Recipe;
