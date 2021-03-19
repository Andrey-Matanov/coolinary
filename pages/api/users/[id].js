import connectDB from "../../../middleware/mongodb";
import User from "../../../models/user";

const handler = async (req, res) => {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const user = await User.findById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(400).send(`User doesn't exist`);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    } else if (req.method === "DELETE") {
        try {
            await User.findByIdAndRemove(id);
            res.send("removed succesfully");
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    } else if (req.method === "PUT") {
        const recipe = req.body.recipe;
        const userValues = await User.findById(id);
        const userRecipes = userValues.userRecipes;

        try {
            await User.findByIdAndUpdate(id, {
                userRecipes: [...userRecipes, recipe],
            });

            res.send("succesfully updated user recipes");
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
