import React from 'react'
import Article from './Article.js'


function Recent(props) {
  const DisplayArticles = props.data.map((article) => {
    return (
      <Article key={article.id}
        link={article.link}
        title={article.title}
        text={article.text.replace(/\\n/g, '\n')}
        teaser={article.teaser}
        date={article.date}
        author={article.author}
        image={article.image}
        class="articles"
      />
    )
  } )
  return (
    <div>
      {DisplayArticles}
    </div>
  )
}

export default Recent