const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    passwordHash: {
        type:String,
        required:true,
        min:6
    },
    followed: [
        {
            type: String,
        }
    ],
    articleCount: {
        type: Number
    },
    favorites: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        }
    ]
})

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', UserSchema)