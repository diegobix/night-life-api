const mongoose = require('mongoose')

const review = new mongoose.Schema({
  content: {
    type: String,
    minLength: 2,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
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
  url: {
    type: String,
    minLength: 5,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviews: [review]
})

localSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Local = mongoose.model('Local', localSchema)

module.exports = Local