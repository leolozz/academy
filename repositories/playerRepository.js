const Player = require('../models/player')

const insertPlayer = async function(name, role) {
    const player = new Player({ name: name, role: role })
    try {
        const newPlayer = await player.save()
        return newPlayer
    } catch (error) {
        throw Error('Error on insert player. ' + error.message)
    }
}

const updatePlayer = async function(player) {
    try {
        return await player.save()
    } catch (error) {
        throw Error('Error on update player. ' + error.message)
    }
}

module.exports = { insertPlayer, updatePlayer }