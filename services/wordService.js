const { insertWord, getRandomWord } = require("../repositories/wordRepository")

const newWord = async function(name, definition) {
    try {
        return await insertWord(name, definition);
    } catch (error) {
        throw error
    }
}

const randomWord = async function() {
    try {
        return await getRandomWord();
    } catch (error) {
        throw error
    }
}

module.exports = { newWord, randomWord }