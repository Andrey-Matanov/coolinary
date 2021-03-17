import connectDB from "../../../middleware/mongodb";
import Recipe from "../../../models/recipe";

const handler = async (req, res) => {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const recipe = await Recipe.findById(id);

            if (recipe) {
                res.send(recipe);
            } else {
                res.status(400).send(`Recipe doesn't exist`);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    } else if (req.method === "DELETE") {
        try {
            await Recipe.findByIdAndRemove(id);
            res.send("removed succesfully");
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    } else if (req.method === "PATCH") {
        const newValues = req.body;

        try {
            await Recipe.findByIdAndUpdate(id, newValues, (error, docs) => {
                if (error) {
                    console.log(error);
                    res.status(400).send(error);
                } else {
                    console.log("Updated Recipe : ", docs);
                    res.send("updated succesfully");
                }
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
