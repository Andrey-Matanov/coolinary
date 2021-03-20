import connectDB from "../../../middleware/mongodb";
import User from "../../../models/user";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const users = await User.find({});

        res.json(users);
    } else if (req.method === "POST") {
        console.log("body: ", req.body);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            uid: req.body.uid,
        });

        await newUser.save();

        res.send("Новый пользователь успешно добавлен");
    } else if (req.method === "DELETE") {
        try {
            await User.deleteMany({});

            res.send("ok");
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
