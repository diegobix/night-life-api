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

app.post('/api/locales', (request, response) => {
  let local = request.body
  local.id = locales.length+1
  
  locales = locales.concat(local)

  response.json(local)
})

app.delete('/api/locales/:id', (request, response) => {
  const id = Number(request.params.id)
  locales = locales.filter(local => local.id !== id)

  response.status(204).end()
})

// Por ultimo se establece el puerto donde se alojara el server
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);