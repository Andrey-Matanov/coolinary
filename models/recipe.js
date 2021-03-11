import mongoose from "mongoose";

const recipe = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

mongoose.models = {};

const Recipe = mongoose.model("units", recipe);

export default Recipe;
