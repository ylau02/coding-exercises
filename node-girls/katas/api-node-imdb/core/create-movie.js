// const checkDuplicates = (movieList, title) => {
//   movieList.some(movie => movie.title === title)}
const createMovie = database => async (title, description) => {
  if (!title) {
    return "Error: Missing movie title"
  } else if (!description) {
      return "Error: Missing movie description"
  } else if (!title && !description) {
    return "Error: Missing movie title and description"
  }

  const allMovies = await database.getAll(); 
 // console.log()

 if (allMovies.some (movie => movie.title === title)) {
   return "A movie with this title already exists"
 }

  return await database.saveData(title, description);

}

module.exports = createMovie;