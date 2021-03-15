import connectDB from "../../../middleware/mongodb";
import Ingredient from "../../../models/ingredient";

const handler = (req, res) => {
    return new Promise((resolve) => {
        switch (req.method) {
            case "GET": {
                Ingredient.find((err) => {
                    if (err) {
                        res.status(400).send("server error");
                        return resolve();
                    }
                }).then((ingredients) => {
                    res.json(ingredients);
                    return resolve();
                });
                break;
            }
            case "POST": {
                const ingredient = new Ingredient(JSON.parse(req.body));
                ingredient.save((err) => {
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
