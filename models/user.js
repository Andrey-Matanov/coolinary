const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
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
        type: [
            {
                id: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                _id: false,
            },
        ],
        default: [],
    },
    rating: {
        type: Object,
        required: true,
    },
});

mongoose.models = {};

module.exports = mongoose.model("User", userSchema, "users");
