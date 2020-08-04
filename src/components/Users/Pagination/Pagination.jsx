import React from 'react'
import PropTypes from 'prop-types'
import classNames from './Pagination.module.css'
import ReactPaginate from 'react-paginate'

export const Pagination = ({ itemsCount, pageSize, page, changePage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize)

  const handleChangePage = ({ selected }) => {
    changePage(selected + 1)
  }

  return (
    <ReactPaginate
      previousLabel={'prev'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={classNames.breakMe}
      pageCount={pagesCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={4}
      onPageChange={handleChangePage}
      containerClassName={classNames.pagination}
      subContainerClassName={`${classNames.pages} ${classNames.pagination}`}
      activeClassName={classNames.active}
      initialPage={page - 1}
      disableInitialCallback={true}
    />
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  page: PropTypes.number,
  changePage: PropTypes.func,
}
Pagination.defaultProps = {
  page: 1,
}
