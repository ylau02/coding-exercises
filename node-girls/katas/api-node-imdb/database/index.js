const movieDatabase = require('./schema')

const database = {
	saveData: async (title, description) => {
		await movieDatabase.create({title,description})
	},
	getAll: async () => {
		return await movieDatabase.find({}) 
	},
	findExactMovie: async (title) => {
		return await movieDatabase.find({ title: title})
	},
	deleteMovie: async (id) => {
		const result =	await movieDatabase.findByIdAndDelete(id)
		return result
	},
	findMovies: async (searchText) => {
		const result = await movieDatabase.find({title: new RegExp(searchText, 'i') })
		return result
	}
};

module.exports = database;
