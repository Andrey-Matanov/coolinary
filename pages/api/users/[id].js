import connectDB from "../../../middleware/mongodb";
import User from "../../../models/user";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const { id } = req.query;
        const user = await User.findById(id);

        res.json(user);
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
