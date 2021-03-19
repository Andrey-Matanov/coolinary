import connectDB from "../../../middleware/mongodb";
import Recipe from "../../../models/recipe";
import User from "../../../models/user";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const categoryId = req.query.categoryId ?? null;
        const findParameters = {};
        if (categoryId) {
            findParameters.categoryId = categoryId;
        }

        const recipes = await Recipe.find(findParameters);
        const amount = req.query.amount ?? recipes.length;
        const last = req.query.last ?? 0;
        const result = recipes.slice(last, last + amount);

        res.json({
            recipes: result,
            isLastRecipes: last + amount >= recipes.length,
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

                res.status(200).send("ok");
            } else {
                res.status(400).send("no user with this id");
            }
        } catch (error) {
            console.log(error);
            res.status(400).send("Error");
        }
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
