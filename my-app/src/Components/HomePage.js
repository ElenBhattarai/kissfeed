import React, { useState, useEffect } from "react";
import MainPage from './Mainpage.js'
import Modal from './Modal.js'
import loginService from '../Services/login'
import articleService from '../Services/article'
import reqArticleService from '../Services/reqArticle'
import userService from '../Services/user'

export default function HomePage() {
  
  const [data,setdata] = useState([])
  const [alldata,setalldata] = useState([])
  const [submit, setSubmit] = useState(true)
  const [user, setUser] = useState(null)
  const [followed, setFollowed] = useState([])
  const [articleCount, setArticleCount] = useState(0)
  const [favorites, setFavorites] = useState([])

  const getUserInfo = async (user) => {

      const response = await userService.getFollowed(user.id)
      setFollowed(response.followed)
      setArticleCount(response.articleCount)
      console.log(response.followed)
      const prevData = await reqArticleService.reqArticles({
          urls: response.followed,
          limit: response.articleCount
        })
      console.log(prevData)
      setdata(prevData)
      setalldata(prevData)
      const prevFavorites = await articleService.getFavorites()
      setFavorites(prevFavorites)

  }
  useEffect(() => {
    const getUserArticles = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        console.log(loggedUser)
        setUser(loggedUser)
        articleService.setToken(loggedUser)
        await getUserInfo(loggedUser)
      }
    }
    getUserArticles()
  }, [])

  const logout = () => {
    window.localStorage.clear()
    articleService.setToken(null)
    setUser(null)
    window.location.reload(false)
  }

  return (
    <div>

      {submit && !user
        ? <Modal
            type='Login'
            setUser={setUser}
            setSubmit={setSubmit}
            getUserInfo={getUserInfo}
          />
        : null}
      {<MainPage
          followed={followed}
          setFollowed={setFollowed}
          articleCount={articleCount}
          setArticleCount={setArticleCount}
          data={data}
          alldata={alldata}
          setdata={setdata}
          setalldata={setalldata}
          logout={logout}
          user={user}
          setUser={setUser}
          favorites={favorites}
          setFavorites={setFavorites}
        />}
      </div>
    );

}
