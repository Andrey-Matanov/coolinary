import connectDB from "../../../middlewares/mongodb.js";
import Category from "../../../models/category.js";
import Recipe from "../../../models/recipe.js";

const handler = (req, res) => {
    return new Promise((resolve) => {
        switch (req.method) {
            case "GET": {
                const { id } = req.query;
                Category.findById(id, undefined, (err) => {
                    if (err) {
                        res.status(400).send("no such category");
                        return resolve();
                    }
                }).then((category) => {
                    Recipe.find({ categoryId: id }, (err) => {
                        if (err) {
                            res.status(400).send("cannot get recipes for this category");
                            return resolve();
                        }
                    }).then((recipes) => {
                        res.json({
                            category: category,
                            recipes: recipes,
                        });
                        return resolve();
                    });
                });
                break;
            }
            case "DELETE": {
                const { id } = req.query;
                Category.findByIdAndDelete(id, undefined, (err) => {
                    if (err) {
                        res.status(400).send("unable to delete");
                        return resolve();
                    }
                }).then(() => {
                    res.send("ok");
                    return resolve();
                });
                break;
            }
            case "PUT": {
                const { id } = req.query;
                Category.findByIdAndUpdate(id, JSON.parse(req.body), undefined, (err) => {
                    if (err) {
                        res.status(400).send("unable to update");
                        return resolve();
                    }
                }).then(() => {
                    res.send("ok");
                    return resolve();
                });
                break;
            }
            default: {
                res.status(422).send("req_method_not_supported");
                return resolve();
            }
        }
    });
};

export default connectDB(handler);
