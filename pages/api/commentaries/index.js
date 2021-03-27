import connectDB from "../../../middleware/mongodb";
import Commentary from "../../../models/commentary";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const commentaryValues = req.body;

        try {
            const newCommentary = new Commentary(commentaryValues);
            const result = await newCommentary.save(commentaryValues);

            res.send({ _id: result._id });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    } else {
        res.status(422).send("req_method_not_supported");
    }
};

export default connectDB(handler);
