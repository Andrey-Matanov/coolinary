import mongoose from "mongoose";

const commentary = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    targetId: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
});

mongoose.models = {};

const Commentary = mongoose.model("commentaries", commentary);

export default Commentary;
