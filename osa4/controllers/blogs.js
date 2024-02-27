const blogsRouter = require('express').Router()   // kaikki blogeihin liittyvät routet
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {      // huom! ei siis enää tarvitse /api/blogs
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })


blogsRouter.post('/', (request, response) => {
const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
    })


module.exports = blogsRouter