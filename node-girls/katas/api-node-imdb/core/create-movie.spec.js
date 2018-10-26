const createMovie = require("./create-movie")
//Here be the tests
describe('Creating a move', () => {

    //The movie must have BOTH a title and description
    it('Should throw an error at an empty title', async () => {

        expect(await createMovie()('', 'hello world')).toEqual('Error: Missing movie title');
    })

    it('Should throw an error at an empty description', async () => {
        expect(await createMovie()('movie', '')).toEqual('Error: Missing movie description')
    })

    //User cannot enter duplicate movies (same title)
    it('Should check for duplicates and not accept movies of the same title', async () => {
        const fakeDatabase = {
            getAll: () => {
                return [
                    {
                        title: "movie1",
                        description: "description1"
                    },
                    {
                        title: "movie2",
                        description: "description1"
                    },
                    {
                        title: "movie3",
                        description: "description1"
                    }
                ]
            },
            saveData: () => {
                
            }
        };
        expect(await createMovie(fakeDatabase)('movie1', 'a movies')).toEqual("A movie with this title already exists");
    })
    
    /* It should call the getAll and saveData methods */
    it("Should called the getAll method once", async () => {
        const fakeDatabase = {
            getAll: () => {
                return [{
                    id: 1,
                    title: "hello darkness forever",
                    description: "my old friend"
                }]
            },
            saveData: () => {
                return {
                    id: 2,
                    title: "hello darkness,",
                    description: "my old friend",
                    status: 'successfully added movie'
                }
            }
        }

        const mockCreateMovie = jest.spyOn(fakeDatabase, "getAll")
        const result = await createMovie(fakeDatabase)('hello darkness forever', 'my old friend')

        expect(mockCreateMovie).toHaveBeenCalled()
    })
    
    it("Should call the saveData method once", async () => {
        const fakeDatabase = {
            getAll: () => {
                return [{
                    id: 1,
                    title: "hello darkness forever 2",
                    description: "my old friend"
                }]
            },
            saveData: () => {
                return {
                    id: 2,
                    title: "hello darkness forever",
                    description: "my old friend",
                    status: 'successfully added movie'
                }
            }
        }
        const mockCreateMovie = jest.spyOn(fakeDatabase, "saveData")
        const result = await createMovie(fakeDatabase)('hello darkness forever', 'my old friend')

        expect(mockCreateMovie).toHaveBeenCalled()
    })
})