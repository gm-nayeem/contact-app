const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minLength: 9,
        maxLength: 15
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = contactSchema;