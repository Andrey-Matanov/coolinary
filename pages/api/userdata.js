import connectDB from "../../middleware/mongodb";
import User from "../../models/user";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const token = req.headers.authorization.split("Bearer ")[1];
        const user = await User.find({ token: token });

        res.send(user[0]);
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
