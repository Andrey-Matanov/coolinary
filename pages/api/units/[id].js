import connectDB from "../../../middleware/mongodb.js";
import Unit from "../../../models/unit.js";

const handler = (req, res) => {
    return new Promise((resolve) => {
        switch (req.method) {
            case "GET": {
                const { id } = req.query;
                Unit.findById(id, undefined, undefined, (err) => {
                    if (err) {
                        res.status(400).send("unable to find unit");
                        return resolve();
                    }
                }).then((unit) => {
                    res.json(unit);
                    return resolve;
                });
                break;
            }
            case "PUT": {
                const { id } = req.query;
                Unit.findByIdAndUpdate(id, JSON.parse(req.body), undefined, (err) => {
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
            case "DELETE": {
                const { id } = req.query;
                Unit.findByIdAndDelete(id, undefined, (err) => {
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
            default: {
                res.status(422).send("req_method_not_supported");
                return resolve();
            }
        }
    });
};

export default connectDB(handler);
