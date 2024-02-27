require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//const app = require('./app') // varsinainen Express-sovellus  tämä pitää jäädä

const config = require('./utils/config')
const logger = require('./utils/logger')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

//const password = process.argv[2]
//const mongoUrl = `mongodb+srv://fullstack:${password}@cluster0.5lrs0ck.mongodb.net/noteApp?retryWrites=true&w=majority`
//'mongodb://localhost/bloglist'

const mongoUrl = config.MONGODB_URI   //process.env.
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


//const PORT = 3003

//const PORT = process.env.PORT
//app.listen(PORT)
//console.log(`Server running on port ${PORT}`)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })