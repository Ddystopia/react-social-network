import React from "react";
import classNames from "./Users.module.css";
import User from "./User/User";

const Users = (props) => {
	const users = props.data.map((u) => (
		<User key={u.id} data={u} follow={props.follow} unFollow={props.unFollow} />
	));

	const pages = Math.ceil(props.usersCount / props.count);
	const pageListItems = [];
	const centerPage = Math.max(props.page - 7, 1);

	for (let i = centerPage; i <= pages && i <= centerPage + 14; i++)
		pageListItems.push(
			<li
				className={props.page === i && classNames.active}
				onClick={() => props.changePage(i)}
			>
				{i}
			</li>
		);

	return (
		<section className={classNames.content}>
			<ul className={classNames.pagination}>{pageListItems}</ul>
			<ul className={classNames.usersList}>{users}</ul>
		</section>
	);
};

export default Users;
