const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Word', wordSchema)