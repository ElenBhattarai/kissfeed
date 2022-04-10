import React from 'react'
import Article from './Article.js'


function Followed(props) {
    const DisplayArticles = props.results.map((article) => {
            return (
                <Article title={article.title} text={article.full_description} teaser={article.description} date={article.pubDate} author={article.creator} image={article.image_url}></Article>
            )
        } )
    return (
        <div>
            {DisplayArticles}
        </div>
    )
}
export default Followed