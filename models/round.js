const mongoose = require('mongoose')

const roundSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word",
        required: true
    },
    definitions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Definition"
    }]
})

module.exports = mongoose.model('Round', roundSchema)