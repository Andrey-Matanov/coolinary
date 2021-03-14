import connectDB from "../../middleware/mongodb";
import Recipe from "../../models/recipeModels/recipe";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const recipes = await Recipe.find(undefined, '_id name categoryId image time difficulty description authorId rating');

        res.json({
            recipes: recipes,
            isLastRecipes: true,
        });
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
