import connectDB from "../../middlewares/mongodb";
import Recipe from "../../models/recipe";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const recipes = await Recipe.find();

        res.json(recipes);
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
