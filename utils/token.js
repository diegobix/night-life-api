const getTokenFrom = (request) => {
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  } else return null
}

module.exports = { getTokenFrom }
