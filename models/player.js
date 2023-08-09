const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Player', playerSchema)