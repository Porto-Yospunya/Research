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
});


module.exports = mongoose.model("Person", personSchema);