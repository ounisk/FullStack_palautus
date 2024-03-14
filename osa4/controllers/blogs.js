const blogsRouter = require('express').Router()   // kaikki blogeihin liittyvät routet
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')     // muistiinpanojen luominen vain kirjautuneille
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {      // huom! ei siis enää tarvitse /api/blogs
    const blogs = await Blog      // tässä refakotoitu promiseista async/await:iin
      .find({}).populate('user', {username: 1, name: 1})    //tämä tehty populate, 4c):ssä
    response.json(blogs) 
    })


blogsRouter.post('/', userExtractor, async (request, response) => {

    const body =request.body
    const user = request.user     // 4.22 käytetään user extractoria
    
    //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)   // 4d)
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)    // 4.20
    ////console.log('decodedToken', decodedToken)
    //  if (!decodedToken.id) {
    //    return response.status(401).json({ error: 'token invalid' })
    //} 
    
    //const user = await User.findById(decodedToken.id)   // 4d) token mukana (4.20 thets)


    //const user = await User.findById(body.userId)      // lisäys 4c):ssä
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
      user: user._id
      })
    
    //console.log('blog', blog)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)  
  })


  blogsRouter.delete('/:id', userExtractor, async (request, response) => {    //4.22
    //console.log("terkut deletestä")
    const user = request.user  // 4.22 luotu middleware userExtractor

    //const decodedToken = jwt.verify(request.token, process.env.SECRET)    // 4.21
    ////console.log('decodedToken', decodedToken)  
    //if (!decodedToken.id) {   //4.21
    //    return response.status(401).json({ error: 'token invalid' })
    //} 
    //const user = await User.findById(decodedToken.id) /// 4.22
    
    const blog = await Blog.findById(request.params.id)
    //console.log('nykyinen user', user)
    //console.log('deletoitava blogi', blog)
    
    if (blog.user.toString() === user.id.toString() ) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
     }  
      else {
        return response.status(401).json({ error: 'user can not delete blog, unauthorized' })
      }

    //await Blog.findByIdAndDelete(request.params.id)
    //response.status(204).end()
    })

  blogsRouter.put('/:id', async (request, response) => {
    //console.log("terveiset routes putista", request.body)
    //const user = request.user
    //console.log("putista user/luoja", user._id)     // 5.9 alle lisätty populate niin liketyksen jälkeen user mukana
    const {title, author, url, likes} = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
      { title, author, url, likes}, {new: true, runValidators:true, context:'query' }).populate('user', { name: 1})

    response.status(200).json(updatedBlog)  
  })  


module.exports = blogsRouter