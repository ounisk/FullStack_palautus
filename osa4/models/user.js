const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   username: {
            type: String,
            required: true,
            minlength: 3,
            unique: true                                   // username oltava yksikäsitteinen
        },
    name: String,

    //password: {                                       ///lisätty 4.16
    //  type:String,
    //  required: true,
    //  minlength: 3
    //},

    passwordHash: String,
    blogs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
        }
        ],
    })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
    //delete returnedObject.password   //
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User