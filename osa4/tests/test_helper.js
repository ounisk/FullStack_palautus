const Blog =require('../models/blog')


const initialBlogs = [
    {
        "title": "Finland",
        "author": "Matti Meikalainen",
        "url": "www.meika.fi",
        "likes": 20
      },
      {
        "title": "Sverige",
        "author": "Tiina Teikalainen",
        "url": "www.teika.fi",
        "likes": 30,
      }
]


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }


  module.exports = {
    initialBlogs, blogsInDb
  }