const Blog =require('../models/blog')
const User = require('../models/user')


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


const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
    }


module.exports = {
    initialBlogs, blogsInDb, usersInDb
  }