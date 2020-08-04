import React, { useRef, useCallback, useEffect } from 'react'
import classNames from './News.module.css'
import { Article } from './Article/Article.jsx'
import { Preloader } from '../common/Preloader/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, getArticles } from '../../redux/newsReducer'
import {
  getNewsPage,
  getNewsPageCount,
  getNewsData,
  getNewsIsFetching,
} from '../../redux/selectors/selectors'

const News = () => {
  const dispatch = useDispatch()
  const page = useSelector(getNewsPage)
  const data = useSelector(getNewsData)
  const isFetching = useSelector(getNewsIsFetching)
  const pageCount = useSelector(getNewsPageCount)
  const loadBottom = useCallback(() => dispatch(setPage(page + 1)), [dispatch, page])

  useEffect(() => {
    dispatch(getArticles(page, pageCount))
  }, [dispatch, page, pageCount])

  const lastBookElementRef = useObserver(isFetching, loadBottom)

  const articles = data
    .reduce((arr, data) => (arr.some(d => d.title === data.title) ? arr : [...arr, data]), [])
    .map((u, i) => (
      <Article refTo={data.length === i + 4 ? lastBookElementRef : null} key={u.title} data={u} />
    ))

  return (
    <section className={classNames.content}>
      <div className={classNames.navWrapper}></div>
      <ul className={classNames.articlesList}>{articles}</ul>
      {isFetching && <Preloader />}
    </section>
  )
}

const useObserver = (isFetching, loadBottom) => {
  const observer = useRef()
  return useCallback(
    node => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) loadBottom()
      })
      if (node) observer.current.observe(node)
    },
    [isFetching, loadBottom]
  )
}
export default News
