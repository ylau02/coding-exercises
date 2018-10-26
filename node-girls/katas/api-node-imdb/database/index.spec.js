const database = require('./index')
var mongoose = require('mongoose');
//var mongoURI = 'mongodb://@localhost:27017/test';

describe('Database', () => {
	beforeEach(async () => await mongoose.connection.collections['movies'].drop());

	it('Saves a movie', async () => {		
		await database.saveData('Despicable Me', 'A movie');

		const allMovies = await database.getAll();
		expect(allMovies[0].title).toBe('Despicable Me');
		expect(allMovies[0].description).toBe('A movie');
	});
	
});