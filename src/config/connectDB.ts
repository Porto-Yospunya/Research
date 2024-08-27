import mongoose from "mongoose";

export const connect = async (uri: any) => {
    try {
        await mongoose.connect(uri);
        console.log("Database connected Successfully :)");
    } catch (error) {
        console.log(`Database connected Fail :( \n${error}`);
    }
}

module.exports = connect;