import React from "react";
import classNames from "./Nav.module.css";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
	return (
		<nav className={classNames.nav}>
			<div
				className={classNames.menuButton}
				onClick={(e) => {
					if (document.getElementById("menu").style.display === "flex")
						document.getElementById("menu").style.display = "none";
					else document.getElementById("menu").style.display = "flex";
				}}
			>
				Menu
			</div>
			<ul id="menu">
				<li>
					<NavLink activeClassName={classNames.active} to="/profile">Profile</NavLink>
				</li>
				<li>
					<NavLink activeClassName={classNames.active} to="/dialogs">Messages</NavLink>
				</li>
				<li>
					<NavLink activeClassName={classNames.active} to="/users">Users</NavLink>
				</li>
				<li>
					<NavLink activeClassName={classNames.active} to="/news">News</NavLink>
				</li>
				<li>
					<NavLink activeClassName={classNames.active} to="/music">Music</NavLink>
				</li>
				<li className={classNames.empty}></li>
				<li>
					<NavLink activeClassName={classNames.active} to="/settings">Settings</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
