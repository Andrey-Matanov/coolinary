import connectDB from "../../../middleware/mongodb";
import Recipe from "../../../models/recipe";
import User from "../../../models/user";
import Commentary from "../../../models/commentary";

const handler = async (req, res) => {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const recipe = await Recipe.findById(id);

            if (recipe) {
                const recipeCommentaries = await Commentary.find({
                    targetId: id,
                });

                res.send({
                    recipe,
                    recipeCommentaries,
                });
            } else {
                res.status(400).send(`Recipe doesn't exist`);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    } else if (req.method === "DELETE") {
        try {
            const result = await Recipe.findByIdAndRemove(id);

            if (result) {
                const authorId = result.authorId;
                const recipeId = result._id.toString();
                const userValues = await User.findById(authorId);
                const userRecipes = userValues.userRecipes.filter(
                    (recipe) => recipe.id !== recipeId
                );

                await User.findByIdAndUpdate(authorId, {
                    userRecipes: userRecipes,
                });

                res.send("removed succesfully");
            } else {
                res.send("no recipe with this id");
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    } else if (req.method === "PUT") {
        const recipeValues = await Recipe.findById(id);

        if (recipeValues === null) {
            res.status(400).send(`recipe with id = ${id} was removed or wasn't created yet`);
        } else {
            const newMark = req.body.newMark;

            try {
                await Recipe.findByIdAndUpdate(id, {
                    rating: {
                        ...recipeValues.rating,
                        average: (recipeValues.rating.average*recipeValues.rating.count + newMark)/(recipeValues.rating.count + 1),
                        count: recipeValues.rating.count + 1,
                    },
                });

                res.send("recipe rating has been successfully updated");
            } catch (error) {
                console.log(error);
                res.status(400).send(error);
            }
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
