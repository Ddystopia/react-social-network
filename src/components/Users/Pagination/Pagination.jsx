import React, { useState } from "react";
import classNames from "./Pagination.module.css";

export default ({
	itemsCount,
	pageSize,
	page = 1,
	changePage,
	portionSize = 15,
}) => {
	const pagesCount = Math.ceil(itemsCount / pageSize);
	// const pages = new Array(pagesCount).map((item, index) => index + 1);
	const pages = [];
	for (let i = 1; i <= pagesCount; i++) pages.push(i);

	const portionsCount = Math.ceil(pagesCount / portionSize);
	const [portionNumber, setPortionNumber] = useState(
		Math.ceil(page / portionSize)
	);
	const rightSideNum = portionNumber * portionSize;
	const leftSideNum = (portionNumber - 1) * portionSize + 1;

	return (
		<div className={classNames.wrapper}>
			<div className={classNames.button}>
				{portionNumber > 1 && (
					<button id="prev" onClick={() => setPortionNumber(portionNumber - 1)}>
						Prev
					</button>
				)}
			</div>
			<ul className={classNames.pagination}>
				{pages
					.filter((i) => i >= leftSideNum && i <= rightSideNum)
					.map((i) => (
						<li
							key={i}
							onClick={() => {
								changePage(i);
								setPortionNumber(Math.ceil(i / portionSize));
							}}
							className={i === page ? classNames.active : ''}
						>
							{i}
						</li>
					))}
			</ul>
			<div className={classNames.button}>
				{portionNumber < portionsCount && (
					<button id="next" onClick={() => setPortionNumber(portionNumber + 1)}>
						Next
					</button>
				)}
			</div>
		</div>
	);
};
