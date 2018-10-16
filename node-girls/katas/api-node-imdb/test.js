function createMovie(movie){
    if(!movie.title){
        return "Error: Missing movie title"
    } else if (!movie.description){
        return "Error: Missing movie description"
    }
    return {
        movie,
        status: 'successfully added movie'
    }.toJSON;
}


//Here be the tests
describe('Creating a move', () => {

    //The movie must have BOTH a title and description
    it('Should throw an error at an empty title', () => {
        const movie = {
            title: '',
            description: 'hello world'
        }
        expect(createMovie(movie)).toEqual('Error: Missing movie title');
        })

    it('Should throw an error at an empty description', () => {
        const movie = {
            title: 'hello world',
            description: ''
        }
        expect(createMovie(movie)).toEqual('Error: Missing movie description')
    })

    /*User must send the data to the API in the following JSON format:
     output: {
        movie: {
            id,
            title,
            description
        },
        status: 'successfully added movie'
    }*/
    it('Should send data to the API in a JSON format', () => {
        const movie = {
            title: "hello darkness,",
            description: "my old friend"
        }
        const expectedResult = {
            movie,
            status: 'successfully added movie'
        }
        expect(typeof createMovie(movie)).toBeTruthy();
        expect(createMovie(movie)).toEqual(expectedResult.toJSON);
    })
    
    //User cannot enter duplicate movies (same title)
})