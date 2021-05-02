import connectDB from "../../../middleware/mongodb";
import User from "../../../models/user";

const handler = async (req, res) => {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const user = await User.findById(id, "_id name email userRecipes collections");
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
    } else if (req.method === "PATCH") {
        const newValues = req.body;

        try {
            const result = await User.findByIdAndUpdate(id, { ...newValues });

            if (result === null) {
                res.status(400).send(`User with id = ${id} was not found`);
            } else {
                res.send("User info was updated successfully");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    } else if (req.method === "PUT") {
        const type = req.body.type;

        switch (type) {
            case "add_recipe": {
                const newRecipe = req.body.newRecipe;
                try {
                    await User.findByIdAndUpdate(id, {
                        $push: { "collections.recipes": newRecipe },
                    });

                    res.send("user's recipes collections were successfully updated");
                } catch (error) {
                    console.log(error);
                    res.status(400).send(error);
                }

                break;
            }
            case "remove_recipe": {
                const removedRecipeId = req.body.removedRecipeId;
                try {
                    await User.findByIdAndUpdate(id, {
                        $pull: { "collections.recipes": removedRecipeId },
                    });

                    res.send(`recipe with id = ${removedRecipeId} was successfully removed`);
                } catch (error) {
                    console.log(error);
                    res.status(400).send(error);
                }

                break;
            }

            case "rate_recipe": {
                const newMark = req.body.newMark;
                try {
                    await User.findByIdAndUpdate(id, {
                        $push: { "userMarks.recipes": newMark },
                    });
                    res.send("user's marks were successfully updated");
                } catch (error) {
                    console.log(error);
                    res.status(400).send(error);
                }

                break;
            }

            case "update_user_rating": {
                const userValues = await User.findById(id, "rating");
                if (userValues === null) {
                    res.status(400).send(`user with id = ${id} was removed or wasn't created yet`);
                } else {
                    const newMark = req.body.newMark;
                    if (userValues.rating.average === 0) {
                        try {
                            await User.findByIdAndUpdate(id, {
                                rating: {
                                    total: newMark,
                                    average: newMark,
                                },
                            });

                            res.send("user's marks were successfully updated");
                        } catch (error) {
                            console.log(error);
                            res.status(400).send(error);
                        }
                    } else {
                        try {
                            await User.findByIdAndUpdate(id, {
                                rating: {
                                    total: userValues.rating.total + newMark,
                                    average:
                                        (userValues.rating.total + newMark) /
                                        (userValues.rating.total / userValues.rating.average),
                                },
                            });

                            res.send("user's marks were successfully updated");
                        } catch (error) {
                            console.log(error);
                            res.status(400).send(error);
                        }
                    }
                }

                break;
            }

            default: {
                res.status(400).send("wrong request parameters");
            }
        }
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
