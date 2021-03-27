import connectDB from "../../../middleware/mongodb";
import Commentary from "../../../models/commentary";

const handler = async (req, res) => {
    const { id } = req.query;

    if (req.method === "DELETE") {
        try {
            const result = await Commentary.findByIdAndRemove(id);

            if (result !== null) {
                res.send("commentary was removed successfully");
            } else {
                res.status(400).send("no commentary with this id");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    } else if (req.method === "PATCH") {
        const newContent = req.body.content;

        try {
            const result = await Commentary.findByIdAndUpdate(id, {
                content: newContent,
            });

            if (result !== null) {
                res.send("commentary was updated successfully");
            } else {
                res.status(400).send("no commentary with this id");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
