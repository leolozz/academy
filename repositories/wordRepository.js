const Word = require('../models/word')

const insertWord = async function(name, definition) {
    const word = new Word({ name: name, definition: definition })
    try {
        const newWord = await word.save()
        return newWord;
    } catch (error) {
        throw error
    }
}

const getRandomWord = async function() {
    try {
        var count = await Word.count()
        var random = Math.floor(Math.random() * count)
        return await Word.findOne().skip(random)
    } catch (error) {
        throw error
    }
}

module.exports = { insertWord, getRandomWord }