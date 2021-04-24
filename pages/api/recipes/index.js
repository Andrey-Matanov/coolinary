import connectDB from "../../../middleware/mongodb";
import Recipe from "../../../models/recipe";
import User from "../../../models/user";
import mongoose from "mongoose";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const categoryId = req.query.categoryId ?? null;
        const search = req.query.search ?? null;
        let findParameters = [];

        const amount = parseInt(req.query.amount) ?? null;
        const last = req.query.last ?? "0";

        if (last !== "0") {
            findParameters.push({ _id: { $gt: new mongoose.Types.ObjectId(last) } });
        }

        if (categoryId) {
            findParameters.push({ categoryId: new mongoose.Types.ObjectId(categoryId) });
        }

        let mongoRecipes;

        if (search) {
            mongoRecipes = await Recipe.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                { $unwind: { path: "$author" } },

                {
                    $lookup: {
                        from: "ingredients",
                        localField: "ingredients.id",
                        foreignField: "_id",
                        as: "ingredients",
                    },
                },
                {
                    $addFields: {
                        ingredients: { $map: { input: "$ingredients", as: "el", in: "$$el.name" } },
                    },
                },
                {
                    $match: {
                        $and: [
                            ...findParameters,
                            {
                                $or: [
                                    { name: { $regex: new RegExp(search) } },
                                    { description: { $regex: new RegExp(search) } },
                                    { "author.name": { $regex: new RegExp(search) } },
                                    { ingredients: { $regex: new RegExp(search) } },
                                ],
                            },
                        ],
                    },
                },
            ]).limit(amount);
        } else if (categoryId) {
            mongoRecipes = await Recipe.aggregate([
                {
                    $match: {
                        $and: findParameters,
                    },
                },
            ]).limit(amount);
        } else {
            mongoRecipes = await Recipe.find(findParameters[0]).limit(amount);
        }

        const recipes = JSON.parse(JSON.stringify(mongoRecipes));

        const authorIds = recipes.map((item) => item.authorId);
        const userNames = await User.find({ _id: { $in: authorIds } }, "_id name");

        recipes.forEach((item) => {
            userNames.find((el) => "" + el._id === item.authorId)
                ? (item["authorName"] = userNames.find((el) => "" + el._id === item.authorId).name)
                : (item["authorName"] = "DELETED_USER");
        });

        res.json({
            recipes: recipes,
            isLastRecipes: mongoRecipes.length < amount,
        });
    } else if (req.method === "POST") {
        const recipeValues = req.body;

        try {
            const authorId = recipeValues.authorId;
            const userValues = await User.findById(authorId);

            if (userValues) {
                const newRecipe = new Recipe(recipeValues);
                const result = await newRecipe.save();

                const userRecipes = userValues.userRecipes;
                const newUserRecipe = { id: result._id, name: recipeValues.name };
                await User.findByIdAndUpdate(authorId, {
                    userRecipes: [...userRecipes, newUserRecipe],
                });

                res.status(200).send({ newRecipeId: result._id });
            } else {
                res.status(400).send("no user with this id");
            }
        } catch (error) {
            console.log(error);
            res.status(400).send("Error");
        }
    } else if (req.method === "DELETE") {
        const authorId = req.query.authorId;

        if (authorId?.length > 0) {
            const userRecipes = await Recipe.find({ authorId: authorId });

            userRecipes.forEach(async (recipe) => await Recipe.findByIdAndDelete(recipe._id));

            res.send("all user recipes were removed successfully");
        } else {
            try {
                await Recipe.deleteMany({});

                res.send("all recipes were removed successfully");
            } catch (error) {
                res.status(400).send(error);
            }
        }
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
