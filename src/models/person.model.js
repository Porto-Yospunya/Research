const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    workplace: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
        default: "uploads\\6e00ec8d81cd689b311bbe7bd37c58c6"
    }
});


module.exports = mongoose.model("Person", personSchema);