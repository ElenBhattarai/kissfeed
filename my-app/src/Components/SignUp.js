import React, { useState } from 'react'
import userService from '../Services/user'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [signedUp, setSignedUp] = useState(false)
  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      await userService.createUser({ username, password })
      setUsername('')
      setPassword('')
      setSignedUp(true)
      setTimeout(() => {
        setSignedUp(false)
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div>
      <form onSubmit={handleSignIn}>
        <p>
          Username: <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </p>
        <p>
          Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </p>
        <div>{signedUp ? 'Successfully signed up. Login to start' : null}</div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp