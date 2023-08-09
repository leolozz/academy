const Player = require("./player");

class Game {
    maxPoints;
    currentStep;
    players = [];
    rounds = [];

    constructor(maxPoints, adminPlayer) {
        this.maxPoints = maxPoints;
        this.players.push(adminPlayer);
        this.currentStep = gameSteps.initialSetup;
    }

    join = function(player) {
        this.players.push(player)
    }
}

const gameSteps = {
    initialSetup: 0,
    wordSelection: 1,
    submitDefinitions: 2,
    vote: 3,
    reveal: 4,
    voteRightDefinition: 5,
}

const createGame = function(adminName, numberOfRounds) {

    var adminPlayer = new Player(adminName, 0)

    return new Game(numberOfRounds, adminPlayer)
}

module.exports = { createGame };