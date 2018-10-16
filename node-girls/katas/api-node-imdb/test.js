function createMovie(title, description){
    return "Error: Missing movie title"
}
//Here be the tests
describe('Creating a move', () => {
    it('Should throw and error at an empty title', () => {
        const movie = {
            title: '',
            description: 'hello world'
        }
        expect(createMovie(movie)).toEqual('Error: Missing movie title');
        })
})