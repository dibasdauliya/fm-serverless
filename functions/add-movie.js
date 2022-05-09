const { query } = require('./util/hasura')

exports.handler = async (e, context) => {
  const { id, title, tagline, poster } = JSON.parse(e.body)
  const { user } = context.clientContext

  const isLoggedIn = user && user.app_metadata
  const roles = user.app_metadata.roles || []

  if (!isLoggedIn || !roles.includes('admin')) {
    return {
      statusCode: 401,
      body: 'Unauthorized'
    }
  }

  // $id: String! => id is required
  const res = await query({
    query: `
        mutation MyMutation($id: String!, $poster: String!, $tagline: String!, $title: String!) {
          insert_movies_one(object: {id: $id, poster: $poster, tagline: $tagline, title: $title}) {
            id
            poster
            tagline
            title
          }
        }
        `,
    variables: { id, title, tagline, poster }
  })

  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
}
