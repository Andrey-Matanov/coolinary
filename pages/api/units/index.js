import connectDB from "../../../middleware/mongodb.js";
import Unit from "../../../models/unit.js";
import Recipe from "../../../models/recipe.js"

const handler = (req, res) => {
    return new Promise((resolve) => {
        switch (req.method) {
            case "GET": {
                const { recipeId } = req.query;
                if (recipeId) {
                    Recipe.findById(recipeId, undefined, undefined, err => {
                        if (err) {
                            res.status(400).send("server error");
                            return resolve();
                        }
                    }).then(recipe => {
                        const ids = recipe.ingredients.map(ingredient => ingredient.unit_id)
                        Unit.find({"_id": { $in: ids }}, undefined, undefined, err => {
                            if (err) {
                                res.status(400).send("unable to find in database");
                                return resolve();
                            }
                        }).then(units => {
                            res.json(units);
                            return resolve();
                        })
                    })
                } else {
                    Unit.find((err) => {
                        if (err) {
                            res.status(400).send("unable to get");
                            return resolve();
                        }
                    }).then((units) => {
                        res.json(units);
                        return resolve();
                    });
                }
                break;
            }
            case "POST": {
                const unit = new Unit(JSON.parse(req.body));
                unit.save((err) => {
                    if (err) {
                        res.status(400).send("unable to save to database");
                    } else {
                        res.send("ok");
                    }
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
