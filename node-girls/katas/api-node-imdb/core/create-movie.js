const checkDuplicates = (movieList, title) => 
  movieList.some(movie => movie.title === title)

const createMovie = database => (movie) => {
  if (!movie.title) {
    return "Error: Missing movie title"
  } else if (!movie.description) {
      return "Error: Missing movie description"
  } else if (!movie.title && !movie.description) {
    return "Error: Missing movie title and description"
  }

 if (checkDuplicates(database.getAll(), movie.title) === true) {
   return "A movie with this title already exists"
 }

  return JSON.stringify(database.saveData())

}

module.exports = createMovie;