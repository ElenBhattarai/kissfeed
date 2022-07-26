import axios from 'axios'

const baseUrl = '/api/users'

const createUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const addFollowed = async (info) => {

  const response = await axios.put(baseUrl, info)
  return response.data
}

const getFollowed = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { createUser, addFollowed, getFollowed }