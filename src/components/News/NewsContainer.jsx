import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { News } from './News'
import { getArticles, setCount, setPage } from '../../redux/newsReducer'
import { compose } from 'redux'
import {
  getNewsData,
  getNewsPage,
  getNewsIsFetching,
  getNewsPageCount,
} from '../../redux/selectors/selectors'

const NewsContainerComponent = ({ data, page, getArticles, pageCount, setPage, isFetching }) => {
  useEffect(() => {
    getArticles(page, pageCount)
  }, [getArticles, page, pageCount])

  const loadBottom = () => setPage(page + 1)

  return <News data={data} loadBottom={loadBottom} isFetching={isFetching} />
}

const mapStateToProps = (state) => ({
  data: getNewsData(state),
  page: getNewsPage(state),
  pageCount: getNewsPageCount(state),
  isFetching: getNewsIsFetching(state),
})

const mapDispatchToProps = { getArticles, setCount, setPage }

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  NewsContainerComponent
)


