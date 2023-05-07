const express = require('express')
const app = express()
const cors = require('cors')

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
  response.json(locales)
})

app.get('/api/locales/:id', (request, resposne) => {
  const id = Number(request.params.id)
  const local = locales.find(local => local.id === id)

  local ? resposne.json(local) : resposne.status(404).end()
})

const generateId = () => {
  const maxId = locales.length > 0 ? Math.max(...locales.map(l => l.id)) : 0
  return maxId + 1
}

app.post('/api/locales', (request, response) => {
  let local = request.body
  
  if (!local.nombre) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!local.direccion) {
    return response.status(400).json({
      error: 'address missing'
    })
  } else if (!local.musica) {
    return response.status(400).json({
      error: 'music missing'
    })
  } else if (!local.horario) {
    return response.status(400).json({
      error: 'schedule missing'
    })
  } else if (!local.consumicion) {
    return response.status(400).json({
      error: 'prize missing'
    })
  }

  const finalLocal = {...local, id: generateId() }

  response.json(finalLocal)
  
})

app.delete('/api/locales/:id', (request, response) => {
  const id = Number(request.params.id)
  locales = locales.filter(local => local.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

// Por ultimo se establece el puerto donde se alojara el server
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);