const validateSubmissionEntry = function(req, res, next) {
    if (req.body == null) {
        res.status(400).send("Request body is empty!")
    } else if (req.body.definition == null || req.body.definition.length == 0) {
        res.status(400).send("[Definition] can't be null or empty")
    } else {
        next();
    }
}

const validateVoteEntry = function(req, res, next) {
    if (req.body == null) {
        res.status(400).send("Request body is empty!")
    } else if (req.body.definitionId == null || req.body.definitionId.length == 0) {
        res.status(400).send("[DefinitionId] can't be null or empty")
    } else {
        next();
    }
}

const validateNewGame = function(req, res, next) {
    if (req.body == null) {
        res.status(400).send("Request body is empty!")
    } else if (req.body.adminName == null || req.body.adminName.length == 0) {
        res.status(400).send("[Admin name] can't be null or empty")
    } else if (req.body.maxPoints == null || req.body.maxPoints == 0) {
        res.status(400).send("[Number of rounds]  can't be null or zero")
    } else {
        next();
    }
}

const validateJoinGame = function(req, res, next) {
    if (req.headers.gameid == null || req.headers.gameid.length == 0) {
        res.status(400).send("Session id must be informed")
    } else if (req.body == null) {
        res.status(400).send("Request body is empty!")
    } else if (req.body.playerName == null || req.body.playerName.length == 0) {
        res.status(400).send("[Player name] can't be null or empty")
    } else {
        next();
    }
}

const validateGameStepJoin = function(req, res, next) {
    if (res.game.currentStep != gameSteps.initialSetup) {
        res.status(400).json({ message: "Can't join this game. The game has started." })
    } else {
        next();
    }
}

const validateGameStepRoundStart = function(req, res, next) {
    if (res.game.currentStep != gameSteps.initialSetup && res.game.currentStep != gameSteps.finishedRound) {
        res.status(400).json({ message: "The round has not finished yet." })
    } else {
        next();
    }
}

const validateGameStepSubmit = function(req, res, next) {
    if (res.game.currentStep != gameSteps.submitDefinition) {
        res.status(400).json({ message: "The round is not open for submissions." })
    } else {

        const currentRound = res.game.rounds.sort((a, b) => a.number - b.number)[res.game.rounds.length - 1]
        const playerSubmission = currentRound.definitions.find(x => x.player == res.player.id)

        if (playerSubmission != null) {
            res.status(400).json({ message: "Player already submitted this round." })
        } else {
            next();
        }
    }
}

const validateGameStepVote = function(req, res, next) {
    if (res.game.currentStep != gameSteps.vote) {
        res.status(400).json({ message: "The round is not open for vote." })
    } else {

        const currentRoundDefinitions = res.game.rounds.sort((a, b) => a.number - b.number)[res.game.rounds.length - 1].definitions
        const definition = currentRoundDefinitions.find(x => x._id == req.body.definitionId)
        const voteList = currentRoundDefinitions.map(x => x.votes).flat().map(String)

        if (!definition) {
            res.status(400).json({ message: "Definition not found" })
        } else if (voteList.includes(res.player.id)) {
            res.status(400).json({ message: "Player already voted this round." })
        } else {
            next();
        }
    }
}

const validateGameStepSelect = function(req, res, next) {
    if (res.game.currentStep != gameSteps.select) {
        res.status(400).json({ message: "The round is not open for right definitions selection." })
    } else {
        next();
    }
}

const gameSteps = {
    initialSetup: 0,
    submitDefinition: 1,
    vote: 2,
    select: 3,
    finishedRound: 4,
    finishedGame: 5
}

module.exports = {
    validateNewGame,
    validateJoinGame,
    validateSubmissionEntry,
    validateGameStepJoin,
    validateGameStepRoundStart,
    validateGameStepSubmit,
    validateGameStepVote,
    validateGameStepSelect,
    validateVoteEntry
}