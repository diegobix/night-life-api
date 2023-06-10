const logger = require('./logger')

const requestLogger = (request, response, next) => {
  const clientIP =
    request.headers['x-forwarded-for']?.split(',').shift() ||
    request.socket?.remoteAddress
  logger.info('Dir:', clientIP)
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  const output = { ...request.body }
  delete output.password
  logger.info('Body:  ', output)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).send({ error: 'token expired' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
