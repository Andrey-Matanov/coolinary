import connectDB from "../../../middleware/mongodb";
import Recipe from "../../../models/recipeModels/recipe";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const recipes = await Recipe.find();
        const amount = Number(req.query.amount) || recipes.length;
        const last = Number(req.query.last) || 0;
        const result = recipes.slice(last, last + amount);

        res.json({
            recipes: result,
            isLastRecipes: last + amount >= recipes.length,
        });
    } else if (req.method === "POST") {
        const recipeValues = req.body;
        const newRecipe = new Recipe(recipeValues);

        try {
            await newRecipe.save();
            res.status(200).send("ok");
        } catch (error) {
            console.log(error);
            res.send("Ошибка");
        }
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
