const articleRouter = require('express').Router()
const Article = require('../models/article')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const getTokenFrom = require('../utils/getToken')
const config = require('../utils/config')


articleRouter.get('/', async (req, res) => {
    const articles = await Article.find({})
    res.json(articles)
})

articleRouter.get('/favorites', async (req, res) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, config.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({
            error: 'token missing or invalid'
        })
    }

    const user = await User.findById(decodedToken.id)
    console.log(user.favorites)
    const articlePromises = user.favorites.map(id => Article.findById(id.toString()))
    const articles = await Promise.all(articlePromises)

    res.json(articles.filter(article => article))
})

articleRouter.post('/', async (req, res) => {

    const newArticles = await Promise.all(req.body.map(article => {
        return Article.findOne(
            { link: article.link }
        )
    }))

    const createArticles = newArticles.map((article, index) => {

        if (!article) {
            const promise = new Article(req.body[index])
            return promise.save()
        } else {
            return article
        }

    })
    const articles = await Promise.all(createArticles)

    res.status(201).json(articles)
})

articleRouter.put('/:id', async (req, res) => {
    const id = req.params.id

    const token = getTokenFrom(req)

    const decodedToken = jwt.verify(token, config.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const user = await User.findById(decodedToken.id)

    const article = req.body
    console.log(article)
    const remove = article.users.includes(user._id.toString())

    article.users = remove
        ? article.users.filter(userId => userId !== user._id.toString())
        : article.users.concat(user._id)


    const updatedArticle = await Article.findByIdAndUpdate(
        id,
        article,
        { new: true, runValidator: true, context: 'query' }
    )

    user.favorites = remove
        ? user.favorites.filter(articleId => articleId.toString() !== article.id)
        : user.favorites.concat(updatedArticle._id)

    await user.save()
    res.json(updatedArticle)
})

articleRouter.delete('/', async (req, res) => {
    await Article.deleteMany({})
    res.status(204).end()
})

module.exports = articleRouter