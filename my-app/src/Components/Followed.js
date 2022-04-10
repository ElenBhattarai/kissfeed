import React from 'react'
import Article from './Article.js'


function Followed(props) {
    const DisplayArticles = props.data.map((article) => {
            return (
                <Article title={article.title} teaser={article.description} date={article.publishedAt} author={article.author} image={article.urlToImage} url={article.url}></Article>
            )
        } )
    return (
        <div>
            {DisplayArticles}
        </div>
    )
}
export default Followed