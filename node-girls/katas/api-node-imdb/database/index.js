const movieDatabase = require('./schema')

const database = {
	saveData: async (title, description) => {
		await movieDatabase.create({title,description})
	},
	getAll: async () => {
		return await movieDatabase.find({}) 
	},
	findMovies: async (title) => {
		//not sure how to search by description
		return await movieDatabase.find({ title: new RegExp(title, 'i') })
	},
	deleteMovie: async (id) => {
		const result =	await movieDatabase.findByIdAndDelete(id)
		return result
	}
};

module.exports = database;
