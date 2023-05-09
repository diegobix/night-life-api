const localsRouter = require('express').Router()
const Local = require('../models/local')

localsRouter.get('/', (request, resposne) => {
  Local.find({}).then(locals => {
    resposne.json(locals)
  })
})

localsRouter.get('/:id', (request, resposne, next) => {
  Local.findById(request.params.id)
    .then(local => {
      if (local) {
        response.json(local)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

localsRouter.post('/', (request, response, next) => {
  let body = request.body

  const local = new Local({
    ...body
  })

  local.save()
    .then(savedLocal => {
      response.json(savedLocal)
    })
    .catch(error => next(error))
  
})

localsRouter.delete('/:id', (request, response, next) => {
  Local.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

localsRouter.put('/:id', (request, response, next) => {
  const {nombre, direccion, musica, consumicion, horario} = request.body
  Local.findByIdAndUpdate(request.params.id, {nombre, direccion, musica, consumicion, horario}, {new: true, runValidators: true, context: 'query'})
    .then(updatedLocal => {
      response.json(updatedLocal)
    })
    .catch(error => next(error))
})

module.exports = localsRouter