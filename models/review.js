const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
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
  },
  local: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Local',
    required: true
  }
})

reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review