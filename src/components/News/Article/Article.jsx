import React from 'react'
// import classNames from './Article.module.css'

const Article = ({ data, refTo }) => {
  const content = data.content || data.description
  return (
    <article ref={refTo || null}>
      <h3>{data.title}</h3>
      <img alt={data.title} src={data.urlToImage} />
      <p>
        {content.replace(/\[\+\d+\s\w+]$/, '')}
        <a href={data.url} area-label="to source">
          {content.match(/\[\+\d+\s\w+]$/)?.[0] || 'go to source'}
        </a>
      </p>
      <div>
        <span>Author: {data.author}</span>
        <span>Published at: {new Date(data.publishedAt).toLocaleDateString()}</span>
      </div>
    </article>
  )
}
export default Article
