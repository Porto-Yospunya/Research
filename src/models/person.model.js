const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    workplace: {
        type: String,
        required: false,
        default: "none"
    },
    contact: {
        type: String,
        required: false,
        default: "none"
    }
});

module.exports = mongoose.model("Person", personSchema);