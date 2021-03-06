import React from 'react'
import Article from './Article.js'


function Recent(props) {
    
    const DisplayArticles = props.data.results.map((article) => {
        return (
            <Article link={article.link} title={article.title} text={article.full_description} teaser={article.description} date={article.pubDate} author={article.creator} image={article.image_url} class="articles"> </Article>
        )
    } )
    return (
    <div>
        {DisplayArticles}
    </div>
)
}

export default Recent