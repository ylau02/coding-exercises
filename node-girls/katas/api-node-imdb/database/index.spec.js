const database = require('./index')
var mongoose = require('mongoose');
//var mongoURI = 'mongodb://@localhost:27017/test';

describe('Database', () => {
	beforeAll(async () => await mongoose.connection.collections['movies'].drop());

	it('Saves a movie', async () => {		
		await database.saveData('Despicable Me', 'A despicable movie');

		const allMovies = await database.getAll();
		expect(allMovies[0].title).toBe('Despicable Me');
		expect(allMovies[0].description).toBe('A despicable movie');
	});
	
	it('Finds a specific movie by exact title', async () => {
		const result = await database.findMovies('Despicable Me');
		expect(result[0].title).toBe('Despicable Me');
	});

	it('Should return a list of movies with similar description', async () => {
		const movieList = await database.findMovies('Despic')
		expect(movieList).toBeDefined()
		//how to check the array if the id changes every time??
	})

	it('Deletes a movie with specific title', async () => {
		const movie = await database.findMovies('Despicable Me')
		const result = await database.deleteMovie(movie[0].id);
		expect(JSON.stringify(result)).toEqual(JSON.stringify(movie[0]));
	});

	//write a test to search by description
});