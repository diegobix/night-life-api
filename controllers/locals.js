const localsRouter = require('express').Router()
const Local = require('../models/local')
const User = require('../models/user')
const Review = require('../models/review')
const jwt = require('jsonwebtoken')
const {getTokenFrom} = require('../utils/token')

localsRouter.get('/', async (request, response, next) => {
  try {
    const locals = await Local.find({}, 'nombre direccion horario consumicion')
    response.status(200).json(locals)
  } catch (error) {
    next(error)
  }
})

localsRouter.get('/:id', async (request, response, next) => {
  try {
    const local = await Local.findById(request.params.id)
      .populate({
        path: 'user',
        select: 'username email'
      })
      .populate({
        path: 'reviews',
        select: '-local',
        populate: {path: 'user', select: 'username'}
      })

    if (!local) return response.status(404).send({error: 'local not found'})

    response.status(200).json(local)
  } catch (error) {
    next(error)
  }
})

localsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) return response.status(401).send({error: 'invalid token'})

    const user = await User.findById(decodedToken.id)
    const local = new Local({
      ...request.body,
      user: user._id,
    })

    const savedLocal = await local.save()
    user.locales.push(savedLocal._id)
    await user.save()

    return response.status(201).json(savedLocal)

  } catch (error) {
    next(error)
  }
})

localsRouter.post('/:id/reviews', async (request, response, next) => {
  try {
    const local = await Local.findById(request.params.id)
    if (!local) return response.status(400).send({error: 'local not found'})

    const {content, date} = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) return response.status(401).send({error: 'invalid token'})

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(400).json({error: "user not found."})
    }

    const review = new Review({
      content,
      date: date ? date : new Date(),
      user: user._id,
      local: local._id
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

localsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) return response.status(401).send({error: 'invalid token'})
    
    const user = await User.findById(decodedToken.id)
    const local = await Local.findById(request.params.id)
    if (!local) return response.status(204).end()

    if (user.id !== local.user.toString()) return response.status(403).send({error: 'local trying to delete is from other user'})

    await local.deleteOne()
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

localsRouter.put('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) return response.status(401).send({error: 'invalid token'})

    const user = await User.findById(decodedToken.id)
    let local = await Local.findById(request.params.id)
    if (!local) return response.status(204).end()

    const {nombre, direccion, musica, consumicion, horario} = request.body
    if (!nombre || !direccion || !musica || !consumicion || !horario) return response.status(400).send({error: 'some field is missing'})

    Object.assign(local, {nombre, direccion, musica, consumicion, horario})
    const updatedLocal = await local.save()
    response.status(200).json(updatedLocal)

  } catch(error) {
    next(error)
  }
})

module.exports = localsRouter