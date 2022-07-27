const Article = require('../models/article')

const initialArticles = [
    {
        source: 'www.source.com',
        title: 'sample title',
        author: 'me',
        link: 'www.link.com',
        text: 'sample text',
        image: 'who.png'
    },
    {
        source: 'www.source2.com',
        title: 'this is a title',
        author: 'you',
        link: 'www.linkedin.com',
        text: 'texting',
        image: 'horton.png'
    },
    {
        source: 'https://opensource.com',
        title: 'entitled',
        author: 'everybody',
        link: 'www.com',
        text: 'nothing here',
        image: 'hears.png'
    }
]

const articlesInDb = async () => {
    const articles = await Article.find({})
    return articles.map(article => article.toJSON())
}

module.exports = {
    initialArticles, articlesInDb
}