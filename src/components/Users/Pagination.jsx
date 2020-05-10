import React from "react";
import classNames from "./Users.module.css";

export default ({ usersCount, pageCount, page, changePage }) => {
	const pages = Math.ceil(usersCount / pageCount);
	const pageListItems = [];
	const centerPage = Math.max(page - 7, 1);

	for (let i = centerPage; i <= pages && i <= centerPage + 14; i++)
		pageListItems.push(
			<li
				className={page === i ? classNames.active : ""}
				onClick={() => changePage(i)}
				key={i}
			>
				{i}
			</li>
		);

	return <ul className={classNames.pagination}>{pageListItems}</ul>;
};
