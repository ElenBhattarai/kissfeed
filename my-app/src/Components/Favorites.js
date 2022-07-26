import React, { useEffect } from 'react'
import articleService from '../Services/article'
import Article from './Article'

const Favorites = (props) => {

  return (
    <div>
      {props.favorites.map((article) => 
        <Article
          article={article}
          user={props.user}
          updateArticle={props.updateArticle}
          class="articles"
      />
      )}
    </div>
  )
}

export default Favorites