
import '../App.css';

import React, {useState, useEffect} from 'react';
import Modal from './Modal.js'


import Feed from './Feed.js'
import Favorites from './Favorites.js'
import articleService from '../Services/article'



function MainPage(props) {
    const [selected, setSelected] = useState(0)
    const [submitted, setSubmit] = useState(false)
    const [showChecklist, setShowChecklist] = useState(true)
    

    const handleCustom = () => {
      setSelected(3)
    }

    const submitCustom = () => {
      setSubmit(!submitted)
      setSelected(3)
    }

    const clearCustom = () => {
      setSelected(5)
      setSubmit(!submitted)
    }
    
    const setFollow = () => {
      setShowChecklist(true)
      setSelected(1)
    }

    const checkList = () => {
      if (showChecklist) {
        return (
          <Modal
            type="checklist"
            setSelected={setSelected}
            setShowChecklist={setShowChecklist}
            data={props.data}
            setdata={props.setdata}
            setalldata={props.setalldata}
            followed={props.followed}
            setFollowed={props.setFollowed}
            articleCount={props.articleCount}
            setArticleCount={props.setArticleCount}
            user={props.user}
            setUser={props.setUser}
          />
        )
      } else {
        return null
      }
    }


    const updateArticle = (articleToChange, toFavorite) => {
      const newArticles = props.data.map(article =>
        article.id !== articleToChange.id
        ? article
        : articleToChange
      )
      props.setdata(newArticles)
      props.setalldata(newArticles)
      const newFavorites = toFavorite
        ? props.favorites.filter(article => article.id !== articleToChange.id) 
        : props.favorites.concat(articleToChange)
        
      props.setFavorites(newFavorites)
    }
    // const fetchapi = async () => {
    //   const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c8503c90442c4249860c2ead0a8ce1f8")
    //   data = await res.json()
    //   // console.log(data.articles)
    //   setrequest(true)
    //   apiwork()
    // }
  
    // fetchapi()
    
    // const apiwork = () => {
    //   // for (let da of data.articles) {
    //   //   // console.log(da.title)
    //   //   console.log(da.content)
    //   // }
  
    //   console.log(data.articles[0].content)
    // }
  
    return (
      
      <div>
        <header className="App-header">
          <div id = 'theHeader'>
          <h1 className = 'hTitle'>
            KISSFEED
          </h1>
          <div className = 'search'>
            <text className = 'searchtext'>
              Search...
            </text>
          </div>
          </div>
        </header>
        <div>
          <div className = 'mainpage'>
            <div
              id = 'column1'
              className = {
                selected === 0
                ? 'feed'
                : selected === 1
                ? 'follow'
                : selected === 2
                ? 'favorites'
                : selected === 3
                ? 'custom'
                : ''}>
                <div className = 'row1'>
                  <button  className= 'sidebarbutton all' onClick={() => setSelected(0)}>
                    Feed
                  </button>
                </div>
                <div className = 'row1'>
                  <button className = 'sidebarbutton follow' onClick= {setFollow}>
                    Follow
                  </button>
                  
                </div>
                <div className='row1'>
                  <button className='sidebarbutton' onClick={() => setSelected(2)}>
                    Favorites
                  </button>
                </div>
                <div className = 'row1 custom'>
                  <button className = 'sidebarbutton' onClick = {() => handleCustom()}>
                    Custom
                  </button>
                </div>
                <div className='row1'>
                  <button className='sidebarbutton' onClick={props.logout}>
                    Logout
                  </button>
                </div>
            </div>
            <div id = 'column2'>
              
                {selected === 0
                ? <Feed
                    data={props.data}
                    user={props.user}
                    updateArticle={updateArticle}
                  />
                : selected === 1
                ? checkList()
                : selected === 2
                ? <Favorites
                    data={props.data}
                    user={props.user}
                    updateArticle={updateArticle}
                    favorites={props.favorites}
                  />
                : selected === 3
                ? <Modal
                    type="custom"
                    submitCustom={submitCustom}
                    clearCustom={clearCustom}
                    submitted={submitted}
                  />
                : null}
        
            </div>
          </div>
        </div>
      </div>
    )
  }

export default MainPage