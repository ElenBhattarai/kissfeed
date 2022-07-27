import React from 'react'
import Article from './Article.js'


function Feed(props) {
  if (props.data.length > 0) {
    console.log(props.data[0].source)
    const DisplayArticles = props.data.map((article) => {

      return (
        <Article key={article.id}
          article={article}
          user={props.user}
          updateArticle={props.updateArticle}
          class="articles"
        />
      )
    })
    return (
      <div>
        {DisplayArticles}
      </div>
    )
  } else {
    return null
  }
}
export default Feed