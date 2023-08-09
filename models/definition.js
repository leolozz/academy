const mongoose = require('mongoose')

const definitionSchema = new mongoose.Schema({
    definition: {
        type: String,
        required: true
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }]
})

module.exports = mongoose.model('Definition', definitionSchema)