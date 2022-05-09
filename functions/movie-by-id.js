const movies = require('../data/movies.json')

exports.handler = async ({ queryStringParameters }) => {
  const { id } = queryStringParameters
  const movie = movies.find((m) => m.id === id)

  if (!movie) {
    return {
      statusCode: 404,
      body: 'Oops man! There are no movies related to your query.'
    }
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(movie)
    }
  }
}
