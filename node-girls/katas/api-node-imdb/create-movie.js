const checkDuplicates = (movieList, title) => 
  movieList.some(movie => movie.title === title)

const createMovie = database => (movie) => {
  if (!movie.title) {
    return "Error: Missing movie title"
  } else if (!movie.description) {
      return "Error: Missing movie description"
  }

 if (checkDuplicates(database.getAll(), movie.title) === true) {
   return "This movie already exists"
 }

  return {
    title: movie.title,
    description: movie.description,
    status: 'successfully added movie'
  }.toJSON;

}

module.exports = createMovie;