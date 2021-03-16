import connectDB from  "../../../middleware/mongodb.js"
import Ingredient from "../../../models/ingredient.js"

const handler = (req, res) => {
    return new Promise ((resolve) => {
        switch (req.method) {
            case "POST": {
                if (req.body) { 
                    const ids = JSON.parse(req.body).ids;
                    if (ids?.length > 0) {
                        Ingredient.find({"_id": { $in: ids }}, undefined, undefined, err => {
                            if (err) {
                                res.status(400).send("unable to find in database");
                                return resolve();
                            }
                        })
                        .then((ingredients) => {
                            res.json(ingredients);
                            return resolve();
                        })
                    } else {
                        res.status(400).send('empty request');
                        return resolve();
                    }
                } else {
                    res.status(400).send('empty request');
                    return resolve();
                }
                break;
            }
            default: {
                res.status(422).send("req_method_not_supported");
                return resolve();
            }
        }
    })
}

export default connectDB(handler);