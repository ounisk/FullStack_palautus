const blogsRouter = require('express').Router()   // kaikki blogeihin liittyvät routet
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {      // huom! ei siis enää tarvitse /api/blogs
    //Blog
    //  .find({})
    //  .then(blogs => {
    //    response.json(blogs)
    const blogs = await Blog.find({})       // tässä refakotoitu promiseista async/await:iin
    response.json(blogs) 
    })


blogsRouter.post('/', (request, response) => {     // 4.10 muista muuttaa tämän async/await muototon
const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
    })


module.exports = blogsRouter