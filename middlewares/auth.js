const gameRepository = require('../repositories/gameRepository')

const getGame = async function(req, res, next) {
    let game;
    try {
        game = await gameRepository.getGameById(req.headers.gameid)
        if (game == null) {
            res.status(400).json({ message: 'Cannot find game for the provided id' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.game = game
    next()
}

const authenticate = function(req, res, next) {

    let player = res.game.players.find(x => x.id === req.headers.playerid);

    if (player == null) {
        res.status(401).send("Not permitted. Player not found");
    }

    res.player = player
    next();
}

const validateAdminRole = function(req, res, next) {

    if (res.player.role != "admin") {
        res.status(403).send("Unsufficient roles for this operation.")
    }
    next()
}

module.exports = { authenticate, validateAdminRole, getGame };