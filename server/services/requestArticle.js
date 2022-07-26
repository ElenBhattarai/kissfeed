const cheerio = require('cheerio')
const axios = require('axios')
const { spawn } = require('child_process')

const getArticles = (baseUrl, links) => {
  const listOfLinks = [...links]

  return listOfLinks.map(link => {
    return new Promise((success) => {
      const pyprog = spawn('python', ['services/request_article.py', link])
      pyprog.stdout.on('data', (data) => {
        const info = data.toString().split('\r\n')
        const title = info[0].slice(2, -1)
        const text = info[1].slice(2, -1)
        const author = info[2]
        const image = info[3]
        success({
          source: baseUrl,
          link,
          title,
          text,
          author,
          image
        })
      })
      pyprog.stderr.on('data', (data) => {
        console.log(data.toString())
      })
    })}
  )
}
const getData = ({ urls, limit }) => {
  const requests = urls.map(async url => {
    const res = await axios.get(url)
    const html = res.data
    const $ = cheerio.load(html)

    const re = /\/\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\//
    let links = new Set()

    for (let element in $('[href]')) {
      const attributes = $('[href]')[element].attribs
      if (attributes) {
        const link = attributes.href
        const hasDate = re.test(link)
        if (
            link.includes(url) &&
            (hasDate ||
            link.includes('/story/') ||
            link.includes('/articles/') ||
            link.includes('/article/') ||
            link.includes('/news/'))
        ) {
          links.add(link)
          console.log(link)
        }
      }
      if (links.size == limit) break
    }
    const getArticleInfo = await getArticles(url, links)
    
    return Promise.all(getArticleInfo)
  })

  return Promise.all(requests)

}


module.exports = getData