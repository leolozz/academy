const Game = require('../models/game')

const insertGame = async function(maxPoints, adminPlayer) {
    const game = new Game({ maxPoints: maxPoints, players: new Array(adminPlayer) })
    try {
        const newGame = await game.save()
        return newGame
    } catch (error) {
        throw Error('Error on insert game ', error.message)
    }
}

const getGameById = async function(gameId) {
    try {
        const game = await Game.findById(gameId)
            .populate([
                { path: 'players' },
                {
                    path: 'rounds',
                    populate: [
                        { path: 'word' },
                        { path: 'definitions' }
                    ]
                }
            ])
        return game
    } catch (error) {
        throw Error('Error on searching game by id. ' + error.message)
    }
}

const updateGame = async function(game) {
    try {
        return await game.save().then(x => x.populate({
            path: 'rounds',
            populate: [{
                    path: 'word'
                },
                {
                    path: 'definitions'
                }
            ]
        }))
    } catch (error) {
        throw Error('Error updating game. ' + error.message)
    }
}

module.exports = { insertGame, getGameById, updateGame }