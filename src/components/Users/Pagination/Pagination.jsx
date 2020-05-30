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
  //   <div className={classNames.wrapper}>
  //     <div className={classNames.button}>
  //       {portionNumber > 1 && (
  //         <button id="prev" onClick={() => setPortionNumber(portionNumber - 1)}>
  //           Prev
  //         </button>
  //       )}
  //     </div>
  //     <ul className={classNames.pagination}>
  //       {pages
  //         .filter((i) => i >= leftSideNum && i <= rightSideNum)
  //         .map((i) => (
  //           <li
  //             key={i}
  //             onClick={() => {
  //               changePage(i)
  //               setPortionNumber(Math.ceil(i / portionSize))
  //             }}
  //             className={i === page ? classNames.active : ''}
  //           >
  //             {i}
  //           </li>
  //         ))}
  //     </ul>
  //     <div className={classNames.button}>
  //       {portionNumber < portionsCount && (
  //         <button id="next" onClick={() => setPortionNumber(portionNumber + 1)}>
  //           Next
  //         </button>
  //       )}
  //     </div>
  //   </div>
  // )
}
