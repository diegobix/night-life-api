const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(res => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message);
  })

const localSchema = new mongoose.Schema({
  nombre: {
    type: String,
    minLength: 2,
    required: true
  },
  direccion: {
    type: String,
    minLength: 2,
    required: true
  },
  musica: {
    type: String,
    minLength: 2,
    required: true
  },
  consumicion: {
    type: Number,
    minLength: 1,
    required: true
  },
  horario: {
    type: String,
    minLength: 2,
    required: true
  },
})

localSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Local', localSchema)