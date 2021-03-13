const mongoose = require("mongoose");

const userRecipe = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 2,
    },
    avatar: {
        type: String,
        default:
            "https://thumbs.dreamstime.com/z/default-avatar-placeholder-profile-icon-male-eps-file-easy-to-edit-default-avatar-placeholder-profile-icon-male-139556753.jpg",
    },
    userRecipes: {
        type: [userRecipe],
        default: [],
    },
});

module.exports = mongoose.model("User", userSchema, "users");
