import connectDB from "../../middlewares/mongodb";
import Category from "../../models/category";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const categories = await Category.find();

        res.json(categories);
    } else {
        if (req.method === "POST") {
            const data = new Category(JSON.parse(req.body));
            data.save(err => {
                if (err) res.status(400).send("unable to save to database");
            })
            res.status(200).send("ok");
        } else {
                //unsupported method
                res.status(422).send("req_method_not_supported");
        }
    }
}

export default connectDB(handler);
