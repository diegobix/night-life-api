const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const {getTokenFrom} = require('../utils/token')
const jwt = require('jsonwebtoken')

usersRouter.get('/profile', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    const user = await User.findById(decodedToken.id).populate('locales')
      .populate({
        path: 'reviews',
        populate: {path: 'local', select: 'nombre direccion'}
      })
    
    response.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, '-email')
      .populate('locales', 'nombre direccion')
      .populate({
        path: 'reviews',
        select: '-user',
        populate: {path: 'local', select: 'nombre direccion'}
      })

    if (!user) return res.status(404).send({error: 'user not found'})

    res.status(200).json(user)

  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const {username, name, email, password} = request.body
    if (!username || !name || !email || !password) {
      return response.status(400).send({error: 'some field is missing'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      email,
      passwordHash,
    })
  
    const savedUser = await user.save() 
  
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter