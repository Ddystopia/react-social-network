"use client"
import React, { useEffect, useRef, useCallback } from 'react'
import classNames from './News.module.css'
import { ArticleComponent } from './Article/Article'
import { Preloader } from '@/components/common/Preloader/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, getArticles, Article } from '@/redux/newsReducer'
import {
  getNewsPage,
  getNewsPageCount,
  getNewsData,
  getNewsIsFetching,
} from '@/redux/selectors/selectors'

export default () => {
  const dispatch = useDispatch()
  const page = useSelector(getNewsPage)
  const data: Array<Article> = useSelector(getNewsData)
  const isFetching = useSelector(getNewsIsFetching)
  const count = useSelector(getNewsPageCount)
  const loadBottom = useCallback(() => dispatch(setPage(page + 1)), [dispatch, page])

  useEffect(() => {
    dispatch(getArticles({ page, count }))
  }, [dispatch, page, count])

  const lastBookElementRef = useObserver(isFetching, loadBottom)

  const articles = data
    .reduce((arr: Article[], data) => {
      if (arr.some(d => d.title === data.title)) {
        return arr
      } else {
        return [...arr, data]
      }
    }, [])
    .map((u, i) => (
      <ArticleComponent
        refTo={data.length === i + 4 ? lastBookElementRef : null}
        key={u.title}
        data={u}
      />
    ))

  return (
    <section className={classNames.content}>
      <div className={classNames.navWrapper}></div>
      <ul className={classNames.articlesList}>{articles}</ul>
      {isFetching && <Preloader />}
    </section>
  )
}

const useObserver = (isFetching: boolean, loadBottom: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null)
  return useCallback<(node: HTMLDivElement) => any>(
    (node) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadBottom()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isFetching, loadBottom]
  )
}

