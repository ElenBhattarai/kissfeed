import React from 'react'
import Article from './Article'

const Favorites = (props) => {
  console.log(props.favorites)
  return (
    <div>
      {props.favorites.map((article) =>
        <Article key={article.id}
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