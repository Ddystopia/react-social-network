import React, { useRef, useCallback } from 'react'
import classNames from './News.module.css'
import Article from './Article/Article.jsx'
import Preloader from '../common/Preloader/Preloader'

const News = ({ data, loadBottom, isFetching }) => {
  const observer = useRef()
  const lastBookElementRef = useCallback(
    (node) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) loadBottom()
      })
      if (node) observer.current.observe(node)
    },
    [isFetching, loadBottom]
  )

  const articles = data
    .reduce((arr, data) => (arr.some((d) => d.title === data.title) ? arr : [...arr, data]), [])
    .map((u, i) => (
      <Article refTo={data.length === i + 4 && lastBookElementRef} key={u.title} data={u} />
    ))

  return (
    <section className={classNames.content}>
      <div className={classNames.navWrapper}></div>
      <ul className={classNames.articlesList}>{articles}</ul>
      {isFetching && <Preloader />}
    </section>
  )
}

export default News
