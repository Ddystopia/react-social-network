import React, { useState } from "react";
import classNames from "./Pagination.module.css";

export default ({ itemsCount, pageSize, changePage, portionSize = 15 }) => {
	const pagesCount = Math.ceil(itemsCount / pageSize);
	// const pages = new Array(pagesCount).map((item, index) => index);
	const pages = []
	for(let i = 1; i <= pagesCount; i++) pages.push(i)
	
	const portionsCount = Math.ceil(pagesCount / portionSize);
	const [portionNumber, setPortionNumber] = useState(1);
	const rightSideNum = portionNumber * portionSize;
	const leftSideNum = (portionNumber - 1) * portionSize + 1;

	return (
		<div>
			{portionNumber > 1 && (
				<button onClick={() => setPortionNumber(portionNumber - 1)}>
					Prev
				</button>
			)}
			<ul className={classNames.pagination}>
				{pages
					.filter((i) => i >= leftSideNum && i <= rightSideNum)
					.map((i) => (
						<li key={i} onClick={changePage(i)}>
							i
						</li>
					))}
			</ul>
			{portionNumber < portionsCount && (
				<button onClick={() => setPortionNumber(portionNumber + 1)}>
					Next
				</button>
			)}
		</div>
	);
};
