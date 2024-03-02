const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')

const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper')



beforeEach(async () => {
    await Blog.deleteMany({})
    //let blogObject = new Blog(initialBlogs[0])
    let blogObject =new Blog(helper.initialBlogs[0])
    await blogObject.save()
    //blogObject = new Blog(initialBlogs[1])
    blogObject =new Blog(helper.initialBlogs[1])
    await blogObject.save()})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)     // HUom! regex määrittely
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)   // helper lisätty
  })


test('there is field id, not _id', async () => {
    const response = await api.get('/api/blogs')
    assert.notEqual(response.body[0].id, undefined)
})


test('a new blog can be added ', async () => {
    const newBlog = {
        "title": "Norge",
        "author": "Heikki Heikalainen",
        "url": "www.heika.fi",
        "likes": 40,
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)  // helper lisätty
  
    assert(contents.includes('Norge'))
  })





after(async () => {
  await mongoose.connection.close()
})