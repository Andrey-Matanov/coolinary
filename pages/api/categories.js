import connectDB from "../../middleware/mongodb";
import Category from "../../models/category";

const handler = (req, res) => {
    return new Promise((resolve) => {
        switch (req.method) {
            case "GET": {
                Category.find((err) => {
                    if (err) {
                        res.status(400).send("server error");
                        return resolve();
                    }
                }).then((categories) => {
                    res.json(categories);
                    return resolve();
                });
                break;
            }
            case "POST": {
                const category = new Category(JSON.parse(req.body));
                category.save((err) => {
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
