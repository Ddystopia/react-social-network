import React from 'react'
import classNames from './Pagination.module.css'
import ReactPaginate from 'react-paginate'

export const Pagination: React.FC<Props> = ({ itemsCount, pageSize, page, changePage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize)

  const handleChangePage = ({ selected }: { selected: number }) => {
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
      className={classNames.pagination}
      containerClassName={`${classNames.pages} ${classNames.pagination}`}
      // containerClassName={classNames.pagination}
      // subContainerClassName={`${classNames.pages} ${classNames.pagination}`}
      activeClassName={classNames.active}
      initialPage={(page ?? 1) - 1}
      disableInitialCallback={true}
    />
  )
}

interface Props {
  itemsCount: number
  pageSize: number
  page?: number
  changePage: (page: number) => void
}
