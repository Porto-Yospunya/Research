const mongoose = require('mongoose');

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("Database connected successfully!");
    } catch (error) {
        console.log(`Database connected failed.\n${error}`);
    }
}

module.exports = connectDB;