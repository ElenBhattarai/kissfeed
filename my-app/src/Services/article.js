import axios from 'axios'
const baseUrl = '/api/articles'

let token = null

const setToken = (user) => {
  if (user) {
    token = `bearer ${user.token}`
  } else {
    token = null
  }
}

const getFavorites = async () => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.get(`${baseUrl}/favorites`, config)
  return response.data
}

const favorite = async (id, article) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.put(`${baseUrl}/${id}`, article, config)
  return response.data
}

const saveArticles = async (articles) => {
  const response = await axios.post(baseUrl, articles)
  return response.data
}

const deleteAll = async () => {
  await axios.delete(baseUrl)
}

export default { favorite, saveArticles, deleteAll, setToken, getFavorites }