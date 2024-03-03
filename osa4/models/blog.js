const mongoose = require('mongoose')    //blogin skeeman määrittely


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {                                       // lisätty osassa 4c)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  }
  })

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        }
    })

module.exports = mongoose.model('Blog', blogSchema)
