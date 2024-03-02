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


blogsRouter.post('/', async (request, response) => {
    //const blog = new Blog(request.body)
    //blog
    //    .save()
    //    .then(result => {
    //    response.status(201).json(result)
    //    })
    const body =request.body
    //console.log("body", body)
    //console.log("body likes", body.likes)

    //if (body.likes == null) {      // joko näin tai ao. tavalla
    //  body.likes = 0
    //}
    //console.log("body likes2", body.likes)

    if (body.title == null || body.url == null) {     // t. 4.12
      //console.log('puuttuva title tai url', body)
      response.status(400).end()
      return    // palaa takaisin jos täällä
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      })
    
    //console.log('blog', blog)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)  
  })


  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })



module.exports = blogsRouter