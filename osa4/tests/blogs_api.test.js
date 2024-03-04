const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')

const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)
const bcrypt = require('bcrypt')
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
    //await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    //await User.insertMany(helper.initialUser)
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
        const usersAtStart = await helper.usersInDb()

        const user_id = usersAtStart[0].id    // jotta testaus toimii, niin 1.user, tällä tulee id
        //console.log("user_id", user_id)

        const newBlog = {
            "title": "Norge",
            "author": "Heikki Heikalainen",
            "url": "www.heika.fi",
            "likes": 40,
            "userId": user_id
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        //console.log ("norjan blogi", newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        const contents = response.body.map(r => r.title)
    
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)  // helper lisätty
    
        assert(contents.includes('Norge'))
    })


    test('if blog has no likes, default is 0', async () => {
        const usersAtStart = await helper.usersInDb()   // jotta testaus toimii, niin user db:n 1. 
        const user_id = usersAtStart[0].id    //   ...laitetaan syöttäjäksi
        //console.log("user_id", user_id)

        const newBlog = {
            "title": "Denmark",
            "author": "Vikke Viikinki",
            "url": "www.viikinki.fi",
            "userId": user_id
          
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

    test ('a blog can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        //console.log('blogToUpdate_likes', blogToUpdate.likes)
        //console.log('blogToUpdate_id', blogToUpdate.id)
        const updatedBlog = {
            "title": "Finland",
            "author": "Matti Meikalainen",
            "url": "www.meika.fi",
            "likes": 2222,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        //console.log('updatedBlog_likes', blogsAtEnd[0].likes)
        assert.strictEqual(blogsAtEnd[0].likes, 2222)
        })  
    })

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
    })
    
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
        }
    
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
        })
    
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        })
    
    test('creation fails with proper statuscode and message if username too short', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'bc',
            name: 'Bertol Craig',
            password: 'sala',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('is shorter than the minimum allowed length (3)'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        })

    test('creation fails with proper statuscode and message if password too short', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'kuski',
            name: 'Rally Driver',
            password: '',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('password must be at least 3 characters'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        })    



    })





after(async () => {
    //await User.deleteMany({})    // lisätty tämä 4c) että tyhjentää user db:b
    await mongoose.connection.close()
})