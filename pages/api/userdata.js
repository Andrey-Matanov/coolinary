import connectDB from "../../middleware/mongodb";
import User from "../../models/user";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const email = req.headers.email;
        const user = await User.find({ email: email }, "_id name collections userMarks");

        res.send(user[0]);
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
