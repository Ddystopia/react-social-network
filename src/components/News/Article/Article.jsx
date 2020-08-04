import React from 'react'
import PropTypes from 'prop-types'
// import classNames from './Article.module.css'

export const Article = ({ data, refTo }) => {
  const content = data.content || data.description
  return (
    <article ref={refTo}>
      <h3>{data.title}</h3>
      {data.urlToImage && <img alt={data.title} src={data.urlToImage} />}
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

Article.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    urlToImage: PropTypes.string,
    author: PropTypes.string,
    publishedAt: PropTypes.string,
  }),
  refTo: PropTypes.func,
}
