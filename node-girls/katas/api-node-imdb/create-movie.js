const createMovie = (movie) => {
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

module.exports = createMovie;