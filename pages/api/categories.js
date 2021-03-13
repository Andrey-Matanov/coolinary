import connectDB from "../../middleware/mongodb";
import Category from "../../models/category";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const categories = await Category.find();

        res.json(categories);
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
