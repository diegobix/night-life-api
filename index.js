require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Local = require('./models/local')

let locales = [
  {
    "id": 1,
    "nombre": "Test",
    "direccion": "Calle Fimosis 3",
    "musica": "tipo de musica",
    "consumicion": 5,
    "horario": "20:00-03:00"
  },
  {
    "id": 2,
    "nombre": "Test 2",
    "direccion": "Calle calle",
    "musica": "music",
    "consumicion": 4,
    "horario": "21:00-02:00"
  }
]

app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('--------')
  next()
}

app.use(requestLogger)

// Ruta 1: Solicitudes HTTP GET a la ruta raiz de la aplicacion
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Ruta 2: Solicitudes HTTP GET a la ruta notes de la aplicacion
app.get('/api/locales', (request, response) => {
  Local.find({}).then(locales => {
    response.json(locales)
  })
})

app.get('/api/locales/:id', (request, resposne, next) => {
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

app.post('/api/locales', (request, response, next) => {
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

app.delete('/api/locales/:id', (request, response) => {
  Local.findByIdAndRemove(request.params.id)
    .then(res => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/locales/:id', (request, response, next) => {
  const {nombre, direccion, musica, consumicion, horario} = request.body
  Local.findByIdAndUpdate(request.params.id, {nombre, direccion, musica, consumicion, horario}, {new: true, runValidators: true, context: 'query'})
    .then(updatedLocal => {
      response.json(updatedLocal)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'Malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

// Por ultimo se establece el puerto donde se alojara el server
const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`);