import React from 'react'
import classNames from './Pagination.module.css'
import ReactPaginate from 'react-paginate'

export default ({ itemsCount, pageSize, page = 0, changePage }) => {
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
