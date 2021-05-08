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
    userBorn: {
        type: Date,
        default: new Date("1990-01-01T00:00:00"),
    },
    userFrom: {
        type: String,
        default: "Earth",
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
        type: {
            total: Number,
            average: Number,
        },
        default: {
            total: 0,
            average: 0,
        },
    },
    collections: {
        type: {
            recipes: [
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
            articles: [
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
        },
        default: {
            recipes: [],
            articles: [],
        },
    },
    userMarks: {
        type: {
            recipes: [String],
            articles: [String],
        },
        default: {
            recipes: [],
            articles: [],
        },
    },
});

userSchema.index({
    name: "text",
});

mongoose.models = {};

module.exports = mongoose.model("User", userSchema, "users");
