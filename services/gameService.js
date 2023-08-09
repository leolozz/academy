const gameRepository = require('../repositories/gameRepository')
const playerRepository = require('../repositories/playerRepository')
const roundRepository = require('../repositories/roundRepository')
const wordRepository = require('../repositories/wordRepository')
const definitionRepository = require('../repositories/definitionRepository')

const createGame = async function(adminName, maxPoints) {
    try {
        const adminPlayer = await playerRepository.insertPlayer(name = adminName, role = 'admin')
        const newGame = await gameRepository.insertGame(maxPoints, adminPlayer)
        return newGame
    } catch (error) {
        throw error
    }
}

const joinGame = async function(playerName, game) {
    try {
        const newPlayer = await playerRepository.insertPlayer(name = playerName, role = 'member') //tornar o role um boolean?
        game.players.push(newPlayer._id)
        return await gameRepository.updateGame(game);
    } catch (error) {
        throw error
    }
}

const startRound = async function(game) {
    try {
        const newWord = await wordRepository.getRandomWord()
        const wordDefinition = await definitionRepository.insertDefinition(newWord.definition, null)
        const newRound = await roundRepository.insertRound(game.rounds.length + 1, newWord._id, wordDefinition._id)
        game.rounds.push(newRound._id)
        game.currentStep = 1
        return await gameRepository.updateGame(game)
    } catch (error) {
        throw error
    }
}

const gameNextStep = async function(game, nextStep) {
    try {
        game.currentStep = nextStep
        return await gameRepository.updateGame(game)
    } catch (error) {
        throw error
    }
}

const insertDefinition = async function(definition, player, game) {
    try {
        const newDefinition = await definitionRepository.insertDefinition(definition, player)
        const round = game.rounds.sort((a, b) => a.number - b.number)[game.rounds.length - 1]
        round.definitions.push(newDefinition._id)
        await roundRepository.updateRound(round)
        return game

    } catch (error) {
        throw error
    }
}

const allPlayersSubmitted = function(game) {
    const playersIds = game.players.map(x => x._id.toString())
    const round = getCurrentRound(game)

    const definitionsPlayersIds = round.definitions.filter(z => z.player != null).map(x => x.player.toString())
    const res = playersIds.every(z => definitionsPlayersIds.includes(z))
    return res
}

const voteDefinition = async function(definitionId, player, game) {
    try {
        const round = getCurrentRound(game)
        const definition = round.definitions.find(x => x._id == definitionId)

        definition.votes.push(player._id)
        await definitionRepository.updateDefinition(definition)

        return game
    } catch (error) {
        throw error
    }
}

const allPlayersVoted = function(game) {
    const round = getCurrentRound(game)
    const playersIds = game.players.map(x => x._id.toString())

    const votesPlayersIds = round.definitions.map(x => x.votes).flat().map(String)
    console.log(votesPlayersIds)
    const res = playersIds.every(z => votesPlayersIds.includes(z))
    return res
}

const countVotesScore = async function(game) {
    console.log("counting votes")
    const currentRound = getCurrentRound(game)
    const playersVotedDefinitions = currentRound.definitions.filter(x => x.votes.length > 0 && x.player != null)
    const rightDefinitionVotes = currentRound.definitions.filter(x => x.player == null).votes

    // console.log(playersVotedDefinitions)

    console.log("counting players definitions voted")
    playersVotedDefinitions.forEach(async def => {
        console.log(def)
        let player = game.players.find(def.player)
        player.score = player.score + def.votes.length
        await playerRepository.updatePlayer(player)
    });

    console.log("counting right definitions votes")
    rightDefinitionVotes.forEach(async vote => {
        console.log(vote)
        let player = game.players.find(vote)
        player.score = player.score + 2
        await playerRepository.updatePlayer(player)
    })

    return game
}

const getCurrentRound = function(game) {
    return game.rounds.sort((a, b) => a.number - b.number)[game.rounds.length - 1]
}

module.exports = { createGame, joinGame, startRound, insertDefinition, voteDefinition, allPlayersSubmitted, allPlayersVoted, gameNextStep, countVotesScore }