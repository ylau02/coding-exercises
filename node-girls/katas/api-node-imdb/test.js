const createMovie = require("./create-movie")
//Here be the tests
describe('Creating a move', () => {

    //The movie must have BOTH a title and description
    it('Should throw an error at an empty title', () => {
      //  const fakeDatabase = {
      //      getAll: () => {}
      //  }
        const movie = {
            title: '',
            description: 'hello world'
        }
        // const createMockMovie = jest.spyOn(fakeDatabase, "getAll")
        expect(createMovie()(movie)).toEqual('Error: Missing movie title');
        })
        // expect(createMockMovie).not.toHaveBeenCalled();

    it('Should throw an error at an empty description', () => {
        const movie = {
            title: 'hello world',
            description: ''
        }
        expect(createMovie()(movie)).toEqual('Error: Missing movie description')
    })

    //User cannot enter duplicate movies (same title)
    it('Should check for duplicates and not accept movies of the same title', () => {
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
            }
        };
        const movie = {
            title: 'movie1',
            description: 'description2'
        };
        expect(createMovie(fakeDatabase)(movie)).toEqual("This movie already exists");
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
                    movie,
                    status: 'successfully added movie'
                }
            }
        }

        const expectedResult = {
            id: 2,
            movie,
            status: 'successfully added movie'
        }
        //expect(typeof createMovie(movie)).toBeTruthy();
        //expect(createMovie(fakeDatabase)(movie)).toEqual(expectedResult.toJSON);
        expect(createMovie(fakeDatabase)(movie)).toBe(JSON.stringify(expectedResult))
    })
    
    /* It should call the getAll and saveData methods */
    it("Should called the getAll method once", () => {
        const movie = {
            title: "hello darkness,",
            description: "my old friend"
        }

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
                    movie,
                    status: 'successfully added movie'
                }
            }
        }

        const mockCreateMovie = jest.spyOn(fakeDatabase, "getAll")
        const result = createMovie(fakeDatabase)(movie)

        expect(mockCreateMovie).toHaveBeenCalled()
    })
    
    it("Should call the saveData method once", () => {
        const movie = {
            title: "hello darkness,",
            description: "my old friend"
        }

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
                    movie,
                    status: 'successfully added movie'
                }
            }
        }
        const mockCreateMovie = jest.spyOn(fakeDatabase, "saveData")
        const result = createMovie(fakeDatabase)(movie)

        expect(mockCreateMovie).toHaveBeenCalled()
    })
})