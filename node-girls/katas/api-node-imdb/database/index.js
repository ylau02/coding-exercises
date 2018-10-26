const movieDatabase = require('./schema')

const database = {
	saveMovie: async (title, description) => {
		await movieDatabase.create({title,description})
	},
	getAll: async () => {
		return await movieDatabase.find({}) }
};

//console.log(movieDatabase.find({}))
module.exports = database;
