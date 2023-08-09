const { createGame } = require("../domain/game");
const Player = require("../domain/player");
const Session = require("../domain/session");

const player1 = new Player("Leandro", 0);
const player2 = new Player("Matias", 1);
const player3 = new Player("Saulo", 1);
const player4 = new Player("Kleber", 1);
const player5 = new Player("Luana", 0);
const player6 = new Player("Paula", 1);
const player7 = new Player("Maria", 1);
const player8 = new Player("Carlos", 1);

const game1 = createGame(player1.name, 5);
game1.join(player2);
game1.join(player3);
game1.join(player4);

const game2 = createGame(player5.name, 5);
game2.join(player6);
game2.join(player7);
game2.join(player8);

const session1 = new Session(game1, "abcd");
const session2 = new Session(game2, "efgh");

const sessions = [session1, session2];

const createSession = function(session) {
    console.log("Saving new session to database", session.id)
}

const getSession = function(sessionId) {
    return sessions.find(x => x.id == sessionId)
}

exports.getSession = getSession;
exports.createSession = createSession;