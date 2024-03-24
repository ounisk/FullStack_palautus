const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter =require('./controllers/blogs')
const usersRouter = require('./controllers/users')   //lisätty 4c
const testingRouter = require('./controllers/testing')  //lisätty 5d)
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')   //lisätty 4d)
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)   // jos alkuosa on /api/blogs, niin käyttää tota blogsRouteria
app.use('/api/users', usersRouter)    // lisätty kohdassa 4c)
app.use('/api/login', loginRouter)    //lisätty 4d)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app