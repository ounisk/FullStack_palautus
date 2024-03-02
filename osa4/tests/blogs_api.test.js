const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')

const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper')
const logger = require('../utils/logger')


//beforeEach(async () => {
//    await Blog.deleteMany({})
    //let blogObject = new Blog(initialBlogs[0])
//    let blogObject =new Blog(helper.initialBlogs[0])
//    await blogObject.save()
    //blogObject = new Blog(initialBlogs[1])
//    blogObject =new Blog(helper.initialBlogs[1])
//    await blogObject.save()})


beforeEach(async () => {         // beforeEach-metodin optimointi kuten materiaalissa, Mongoosen insertMany metodi
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})    

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

describe('addition of a new blog', () => {
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


    test('if blog has no likes, default is 0', async () => {
        const newBlog = {
            "title": "Denmark",
            "author": "Vikke Viikinki",
            "url": "www.viikinki.fi",
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const blogsAfter = await helper.blogsInDb()
        //const response = await api.get('/api/blogs')
        const contents = blogsAfter.map(r => r.title)  

        assert.strictEqual(blogsAfter.length, helper.initialBlogs.length + 1)  // helper lisätty
        //logger.info('blogsAfter[2] likes', blogsAfter[2].likes)
        assert.strictEqual(blogsAfter[2].likes, 0)
        //assert(contents.includes('Denmark'))
    })


    test('error if blog without title', async () => {
        const newBlog = {
            "author": "Zeus Zeus",
            "url": "www.zeus.fi",
            "likes": 50,
        }
        
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

        //const blogsAfter = await helper.blogsInDb()
        //assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
        })


    test('error if blog without url', async () => {
        const newBlog = {
            "title": "Kreikka",
            "author": "Mytilus Myrtille",
            "likes": 99,
        }
        
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

        //const blogsAfter = await helper.blogsInDb()
        //assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
        })
    }) 

describe ('deletion and modification of a blog', () =>{
    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        //console.log('deletoitava', blogToDelete)
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
      
        const contents = blogsAtEnd.map(r => r.title)
        assert(!contents.includes(blogToDelete.title))
        //console.log('deletoinnin jälkeen eka blogi', contents[0])
      
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
      })
    })




after(async () => {
  await mongoose.connection.close()
})