import connectDB from "../../middlewares/mongodb";
import Unit from "../../models/unit";

const handler = async (req, res) => {
    if (req.method === "GET") {
        const units = await Unit.find();

        res.json(units);
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
