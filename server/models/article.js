const mongoose = require("mongoose")

const ArticleSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        min:3,
        max:300,
        unique:true
    },
    author: {
        type:String,
        required:true,
        max:50,
        unique:true
    },
    link: { 
        type:String,
        required:true,
        min:6
    },
    text: {
        type:String,
    }
})

module.exports = mongoose.model("Article",ArticleSchema)