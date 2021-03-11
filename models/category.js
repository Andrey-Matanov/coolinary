import mongoose from "mongoose";

const category = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

mongoose.models = {};

const Category = mongoose.model("categories", category);

export default Category;
