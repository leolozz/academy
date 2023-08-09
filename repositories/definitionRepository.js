const Definition = require("../models/definition");

const insertDefinition = async function(definitionText, player) {
    const definition = new Definition({
        definition: definitionText,
        player: player == null ? null : player._id, //player?._id 
    });
    try {
        const newDefinition = await definition.save();
        return newDefinition;
    } catch (error) {
        throw error;
    }
};

const updateDefinition = async function(definition) {
    try {
        return await definition.save()
    } catch (error) {
        throw Error('Error updating definition. ' + error.message)
    }
}

module.exports = { insertDefinition, updateDefinition };