function createMovie(title, description){
    if(!title){
        return "Error: Missing movie title"
    }
    return "Error: Missing movie description"
}
//Here be the tests
describe('Creating a move', () => {
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
})