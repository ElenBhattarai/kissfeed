const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./article_api_helper')
const app = require('../app')
const api = supertest(app)

const Article = require('../models/article')

beforeEach(async () => {
    await Article.deleteMany({})
    const promises = helper.initialArticles.map(article => {
        const newArticle = new Article(article)
        return newArticle.save()
    })
    await Promise.all(promises)

})

test('articles returned as json', async () => {
    await api
        .get('/api/articles')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all articles are returned', async () => {
    const response = await api.get('/api/articles')

    expect(response.body).toHaveLength(helper.initialArticles.length)
})

test('a specific article found', async () => {
    const response = await api.get('/api/articles')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
        'sample title'
    )
})

test('a valid article is added', async () => {
    const newArticle = [{
        title: 'title',
        author: 'author',
        source: 'source',
        link: 'link',
        text: 'text',
        image: 'image'
    }]

    await api
        .post('/api/articles')
        .send(newArticle)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const articlesAtEnd = await helper.articlesInDb()
    expect(articlesAtEnd).toHaveLength(helper.initialArticles.length + 1)

    const links = articlesAtEnd.map(n => n.link)
    expect(links).toContain(
        'link'
    )
})

test('article without source or link or title is not added', async () => {
    const newArticle = [{
        author: 'author',
        source: 'source',
        text: 'text',
        image: 'image'
    }]

    await api
        .post('/api/articles')
        .send(newArticle)
        .expect(400)

    const articlesAtEnd = await helper.articlesInDb()

    expect(articlesAtEnd).toHaveLength(helper.initialArticles.length)
})


afterAll(() => {
    mongoose.connection.close()
})