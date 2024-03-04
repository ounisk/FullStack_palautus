const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    //console.log('salasana liian lyhyt')
    return response.status(400).json({ error: 'password must be at least 3 characters'})}   // 4.16

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User    //.find({}) oli ennen, ao. käytetään populate (4c) että nähdään mitä halutaan
    .find({}).populate('blogs',  { author: 1, title: 1, url: 1 })  //tämä lisätä populatee
    response.json(users)    // tämä myös lisätä populateen
  })

module.exports = usersRouter