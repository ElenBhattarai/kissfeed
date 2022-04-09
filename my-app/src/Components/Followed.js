import React, {useState} from 'react'
import Article from './Article.js'
import template from '../JSON/template.json'

function Followed(props) {
    const DisplayArticles = props.data.map((article) => {
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