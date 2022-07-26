import axios from 'axios'
import articleService from './article'

const baseURL = '/articles'

const reqArticles = async (request) => {
  const response = await axios.post(baseURL, request)

  const articles = await articleService.saveArticles(response.data)
  return articles
}

export default { reqArticles }