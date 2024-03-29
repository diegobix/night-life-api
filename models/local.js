const mongoose = require('mongoose')
const Review = require('./review')

const localSchema = new mongoose.Schema({
  nombre: {
    type: String,
    minLength: 2,
    required: true,
  },
  direccion: {
    type: String,
    minLength: 2,
    required: true,
  },
  musica: {
    type: String,
    minLength: 2,
    required: true,
  },
  url: {
    type: String,
    minLength: 5,
    required: true,
  },
  consumicion: {
    type: Number,
    minLength: 1,
    required: true,
  },
  horario: {
    type: String,
    minLength: 2,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['discoteca', 'sala', 'bar'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
})

localSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Local = mongoose.model('Local', localSchema)

module.exports = Local
