import mongoose from "mongoose";

const unit = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

mongoose.models = {};

const Unit = mongoose.model("units", unit);

export default Unit;
