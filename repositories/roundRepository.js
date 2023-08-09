const Round = require('../models/round')

const insertRound = async function(roundNumber, word, wordDefinition) {
    const round = new Round({ number: roundNumber, word: word, definitions: [wordDefinition] })
    try {
        return await round.save()
    } catch (error) {
        throw error
    }
}

const updateRound = async function(round) {
    try {
        return await round.save().then(x => x.populate([{
                path: 'word'
            },
            {
                path: 'definitions'
            }
        ]))
    } catch (error) {

    }
}

module.exports = { insertRound, updateRound }