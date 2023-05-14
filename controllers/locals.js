const localsRouter = require('express').Router()
const Local = require('../models/local')
const User = require('../models/user')
const Review = require('../models/review')

localsRouter.get('/', (request, response) => {
  Local.find({}).populate('user reviews').then(locals => {
    response.json(locals)
  })
})

localsRouter.get('/:id', (request, response, next) => {
  Local.findById(request.params.id).populate('user reviews')
    .then(local => {
      console.log(local)
      if (local) {
        response.json(local)
      } else {
        response.status(404).end()
      }
    })
    .catch(error =>{
      console.log("error " + error)
      next(error)})
})

localsRouter.post('/', (request, response, next) => {
  let localData = request.body
  localData.user = localData.userId
  delete localData.userId

  const local = new Local({
    ...localData
  })

  local.save()
    .then(savedLocal => {
      response.json(savedLocal)
    })
    .catch(error => next(error))
  
})

localsRouter.post('/:id/reviews', async (request, response, next) => {
  try {
    const local = await Local.findById(request.params.id)
    const {content, date, userId} = request.body
    const user = await User.findById(userId)
    if (!user) {
      response.status(400).json({error: "user not valid."})
    }

    const review = new Review({
      content,
      date: date ? date : new Date(),
      user: user._id,
      local
    })

    const savedReview = await review.save()
    local.reviews.push(savedReview)
    await local.save()
    user.reviews.push(savedReview)
    await user.save()

    response.json(savedReview)
  } catch (error) {
    next(error)
  }
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