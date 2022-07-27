const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    title: {
        type:String,
        required:true,
        min:3,
        max:300,
    },
    author: {
        type:String,
        max:50,
    },
    link: {
        type:String,
        required:true,
        min:6
    },
    text: {
        type:String,
    },
    image: {
        type: String,
    },
    users: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

})

ArticleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Article', ArticleSchema)