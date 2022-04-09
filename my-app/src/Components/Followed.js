import React, {useState} from 'react'
import Article from './Article.js'
import template from '../JSON/template.json'

function Followed() {
    const DisplayArticles = template.map((article) => {
            return (
                <Article title={article.title} teaser={article.description} date={article.publishedAt} author={article.author}></Article>
            )
        } )
    return (
        <div>
            {DisplayArticles}
        </div>
    )
}
export default Followed