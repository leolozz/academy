const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    maxPoints: {
        type: Number,
        required: true
    },
    currentStep: {
        type: Number,
        required: true,
        default: 0
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    rounds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Round'
    }]
})

module.exports = mongoose.model('Game', gameSchema)