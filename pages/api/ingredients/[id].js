import connectDB from "../../../middlewares/mongodb.js";
import Ingredient from "../../../models/ingredient.js";

const handler = (req, res) => {
    return new Promise (resolve => {
        switch (req.method) {
            case "GET": {
                const { id } = req.query;
                Ingredient.findById(id, undefined, err => {
                    if (err) {
                        res.status(400).send("No such ingredient");
                        return resolve();
                    }
                })
                .then(ingredient => {
                    res.json(ingredient);
                    return resolve();
                })
                break;
            }
            case "DELETE": {
                const { id } = req.query;
                Ingredient.findByIdAndDelete(id, undefined, err => {
                    if (err) {
                        res.status(400).send("unable to delete");
                        return resolve();
                    }
                })
                .then(() => {
                    res.send("ok");
                    return resolve();
                })
                break;
            }
            default: {
                //unsupported method
                res.status(422).send("req_method_not_supported");
                return resolve();
            }
        }
    })
}

export default connectDB(handler);