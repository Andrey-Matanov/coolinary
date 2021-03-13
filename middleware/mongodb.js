import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
    Object.keys(mongoose.connection.models).forEach((key) => {
        delete mongoose.connection.models[key];
    });

    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.mongodburl, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
    });

    mongoose.Promise = global.Promise;

    return handler(req, res);
};

export default connectDB;
