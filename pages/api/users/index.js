import connectDB from "../../../middleware/mongodb";
import User from "../../../models/user";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const users = await User.find();

        res.json(users);
    } else if (req.method === "POST") {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            token: req.body.token,
        });

        await newUser.save();

        res.send("Новый пользователь успешно добавлен");
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
