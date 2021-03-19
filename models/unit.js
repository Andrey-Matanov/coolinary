import mongoose from "mongoose";

const unit = new mongoose.Schema({
    name: [ String ]
});

mongoose.models = {};

const Unit = mongoose.model("units", unit);

export default Unit;
