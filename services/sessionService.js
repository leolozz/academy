// const { createGame } = require("../domain/game");
// const Session = require("../domain/session");
// const sessionRepository = require("../repositories/sessionRepository");

// const newSession = function(adminName, numberOfRounds) {
//     let game = createGame(adminName, numberOfRounds);
//     let session = new Session(game)
//     sessionRepository.createSession(session);

//     return {
//         sessionId: session.id,
//         adminId: session.game.players[0].id
//     }
// }

// exports.newSession = newSession;