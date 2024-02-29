const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')

const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)

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

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)     // HUom! regex määrittely
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })


after(async () => {
  await mongoose.connection.close()
})