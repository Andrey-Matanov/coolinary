import connectDB from "../../middleware/mongodb";
import Unit from "../../models/unit";

const handler = (req, res) => {
    return new Promise((resolve) => {
        switch (req.method) {
            case "GET": {
                Unit.find((err) => {
                    if (err) {
                        res.status(400).send("unable to get");
                        return resolve();
                    }
                }).then((units) => {
                    res.json(units);
                    return resolve();
                });
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
                //unsupported method
                res.status(422).send("req_method_not_supported");
                return resolve();
            }
        }
    });
};

export default connectDB(handler);
