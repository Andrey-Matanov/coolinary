import connectDB from "../../middlewares/mongodb";
import User from "../../models/user";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const users = await User.find();

        res.json(users);
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
