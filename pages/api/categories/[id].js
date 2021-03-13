import connectDB from "../../../middlewares/mongodb";
import Category from "../../../models/category";
import Recipe from "../../../models/recipe"

const handler = async (req, res) => {
    if (req.method === "GET") {
        const { id } = req.query;
        const category = await Category.findById(id, undefined, err => {
            if (err) res.status(400).send("no such category")
        });
        if (!category) {
            res.status(400).send("no such category")
        } else {
            const recipes = await Recipe.find({"categoryId": id }, err => { //{"categoryId": id }
                if (err) res.status(400).send("cannot get recipes")
            })
            console.log(recipes)
            res.json({
                "category": category,
                "recipes": recipes,
            });
        }
    } else {
        if (req.method === "DELETE") {
            const { id } = req.query;
            await Category.findByIdAndDelete(id, undefined, err => {
                if (err) res.status(400).send("unable to delete")
            })
            res.status(200).send("ok");
        } else {
            if (req.method === "PUT") {
                const { id } = req.query;
                await Category.findByIdAndUpdate(id, JSON.parse(req.body), undefined , err => {
                    if (err) res.status(400).send("unable to update");
                });
                res.status(200).send("ok");
            } else {
                //unsupported method
                res.status(422).send("req_method_not_supported");
            }
        }
    }
};

export default connectDB(handler);
