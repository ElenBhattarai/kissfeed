import React, { useState } from 'react'
import loginService from '../Services/login'
import articleService from '../Services/article'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      props.setUser(user)
      articleService.setToken(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      props.getUserInfo(user)
      props.setSubmit(false)
    } catch (exception) {
      console.log(exception)
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          Username: <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </p>
        <p>
          Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </p>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm