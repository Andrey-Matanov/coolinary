import connectDB from "../../../middleware/mongodb";
import Recipe from "../../../models/recipe";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const recipes = await Recipe.find();
        const amount = req.query.amount ?? recipes.length;
        const last = req.query.last ?? 0;
        const result = recipes.slice(last, last + amount);

        res.json({
            recipes: result,
            isLastRecipes: last + amount >= recipes.length,
        });
    } else if (req.method === "POST") {
        const recipeValues = req.body;
        console.log(recipeValues);

        try {
            const newRecipe = new Recipe(recipeValues);
            await newRecipe.save();
            res.status(200).send("ok");
        } catch (error) {
            console.log(error);
            res.status(400).send("Error");
        }
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
