const auth = require('./middlewares/auth');
const validate = require('./middlewares/validation')
const express = require('express');
const bodyParser = require('body-parser');
const gameService = require('./services/gameService')
const { connectToDatabase } = require('./db/conn');
const wordService = require('./services/wordService');
const app = express();
const port = 5000;

connectToDatabase()
    .then(app.listen(port, () => console.log(`Academy app listening on port ${port}!`)))
    .catch((err) => { console.log(err); throw err })

app.use(bodyParser.json());

app.get('/', (req, res) => res.status(204).send("Application is running!"));

//começa uma nova partida
app.post('/game/new', validate.validateNewGame, async(req, res) => {
    try {
        var newGame = await gameService.createGame(req.body.adminName, req.body.maxPoints)
        res.status(201).json(newGame)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//internal-only
app.get('/game', auth.getGame, async(req, res) => {
    try {
        res.json(res.game)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//juntar-se a uma partida existente
app.post('/game/join', validate.validateJoinGame, auth.getGame, validate.validateGameStepJoin, async(req, res) => {
    try {
        const game = await gameService.joinGame(req.body.playerName, res.game)
        res.json(game)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//inicia um novo round
//admin role
app.post('/game/round/start', auth.getGame, auth.authenticate, auth.validateAdminRole, validate.validateGameStepRoundStart, async(req, res) => {
    try {
        const game = await gameService.startRound(res.game)
        const currentRound = game.rounds.sort((a, b) => a.number - b.number)[game.rounds.length - 1]
        res.json({
            word: currentRound.word.name,
            roundNumber: currentRound.number
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//enviar nova definição
app.post('/definition/submit', validate.validateSubmissionEntry, auth.getGame, auth.authenticate, validate.validateGameStepSubmit, async(req, res) => {
    try {
        const game = await gameService.insertDefinition(req.body.definition, res.player, res.game)
            //socket.emit('player x has submitted')

        if (gameService.allPlayersSubmitted(game)) {
            await gameService.gameNextStep(game, 2)
                //socket.emit('all players submitted') // defintions = [{definitionId: "xpto", definitionText: "Cabeça de batata"}]
        }
        res.status(201).send("Definition submitted")

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//votar em uma definição
app.post('/definition/vote', validate.validateVoteEntry, auth.getGame, auth.authenticate, validate.validateGameStepVote, async(req, res) => {
    try {
        let game = await gameService.voteDefinition(req.body.definitionId, res.player, res.game)
            //socket.emit('player x has votted')
        if (gameService.allPlayersVoted(game)) {
            game = await gameService.countVotesScore(game)
                // await gameService.gameNextStep(game, 3)
                //update game status
                //socket.emit('all players voted')
        }
        res.status(201).send("Voted")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//inserir palavra na base
app.post('/word', async(req, res) => {
    try {
        var newWord = await wordService.newWord(req.body.name, req.body.definition)
        res.status(201).json(newWord)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//consultar palavra aleatória
app.get('/word/random', async(req, res) => {
    try {
        var randomWord = await wordService.randomWord()
        res.status(200).json({ name: randomWord.name, definition: randomWord.definition })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})