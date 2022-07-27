
const requestArticle = require('express').Router()
const getData = require('../services/requestArticle.js')


requestArticle.post('/', async (req, res) => {
    const data = await getData(req.body)
    console.log(data)
    res.send(data.flat())
})


module.exports = requestArticle