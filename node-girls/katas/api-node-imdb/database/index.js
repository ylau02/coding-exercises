const movieDatabase = require('./schema')

const database = {
	saveData: async (title, description) => {
		await movieDatabase.create({title,description})
	},
	getAll: async () => {
		return await movieDatabase.find({}) }
};

module.exports = database;
