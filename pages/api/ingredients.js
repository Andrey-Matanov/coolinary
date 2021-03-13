import connectDB from "../../middleware/mongodb";
import Ingredient from "../../models/ingredient";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const ingredients = await Ingredient.find();

        res.json(ingredients);
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
