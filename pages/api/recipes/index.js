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

        const amount = parseInt(req.query.amount) ?? null
        const last = req.query.last ?? "0";

        if (last != "0") {
            findParameters._id = {$gt: last}
        }
        
        const mongoRecipes = await Recipe.find(findParameters).limit(amount);
        
        const recipes = JSON.parse(JSON.stringify(mongoRecipes))

        const authorIds = recipes.map(item => item.authorId)
        const userNames = await User.find({"_id": {$in: authorIds }}, "_id name");

        recipes.forEach(item => {
            userNames.find(el => "" + el._id === item.authorId) ? (
                item["authorName"] = userNames.find(el => "" + el._id === item.authorId).name
            ) : (
                item["authorName"] = "DELETED_USER"
            )
        }
        );

        res.json({
            recipes: recipes,
            isLastRecipes: mongoRecipes.length < amount
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
