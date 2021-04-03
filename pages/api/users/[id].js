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
                const userValues = await User.findById(id);

                if (userValues === null) {
                    res.status(400).send(`user with id = ${id} was removed or wasn't created yet`);
                } else {
                    const newRecipe = req.body.newRecipe;
                    const userCollectionsRecipes = userValues.collections.recipes;

                    if (userCollectionsRecipes.some((recipe) => recipe.id === newRecipe.id)) {
                        res.status(400).send("this recipe is already in collections");
                    } else {
                        try {
                            await User.findByIdAndUpdate(id, {
                                collections: {
                                    ...userValues.collections,
                                    recipes: [...userCollectionsRecipes, newRecipe],
                                },
                            });

                            res.send("user's recipes collections were successfully updated");
                        } catch (error) {
                            console.log(error);
                            res.status(400).send(error);
                        }
                    }
                }

                break;
            }
            case "remove_recipe": {
                const userValues = await User.findById(id);

                if (userValues === null) {
                    res.status(400).send(`user with id = ${id} was removed or wasn't created yet`);
                } else {
                    const removedRecipeId = req.body.removedRecipeId;
                    const userCollectionsRecipes = userValues.collections.recipes;

                    if (userCollectionsRecipes.some((recipe) => recipe.id === removedRecipeId)) {
                        try {
                            await User.findByIdAndUpdate(id, {
                                collections: {
                                    ...userValues.collections,
                                    recipes: [
                                        ...userCollectionsRecipes.filter(
                                            (recipe) => recipe.id !== removedRecipeId
                                        ),
                                    ],
                                },
                            });

                            res.send(
                                `recipe with id = ${removedRecipeId} was successfully removed`
                            );
                        } catch (error) {
                            console.log(error);
                            res.status(400).send(error);
                        }
                    } else {
                        res.send(`recipe with id = ${removedRecipeId} is not in collections`);
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
