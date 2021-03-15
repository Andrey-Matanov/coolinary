import mongoose, { ObjectId } from "mongoose";

const recipe = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: ObjectId,
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
        type: ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    ingredients: [
        {
            id: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            unit_id: {
                type: Number,
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
                type: ObjectId,
                required: true,
            },
            authorId: {
                type: ObjectId,
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
