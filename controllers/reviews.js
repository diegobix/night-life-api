const reviewsRouter = require('express').Router()
const Review = require('../models/review')

reviewsRouter.get('/', async (request, response) => {
  const reviews = await Review.find({})
})

reviewsRouter.post('/', async (request, response) => {
  const body = request.body

  const review = new Review({...body})

  const savedReview = await review.save()

  response.status(201).json(savedReview)
})

module.exports = reviewsRouter