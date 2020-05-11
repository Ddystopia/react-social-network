import React, { useState } from "react";
import classNames from "./Nav.module.css";
import ListItem from "./ListItem";

const Nav = (props) => {
	const [menuState, setMenuState] = useState(window.innerWidth < 761);
	const menuChange = () => setMenuState(!menuState);
	return (
		<nav className={classNames.nav}>
			<div className={classNames.menuButton} onClick={menuChange}>
				Menu
			</div>
			<ul id="menu" hidden={menuState}>
				<ListItem text={"Profile"} to={"/profile"} keyProp={1} active={classNames.active} />
				<ListItem text={"Messages"} to={"/dialogs"} keyProp={2} active={classNames.active} />
				<ListItem text={"Users"} to={"/users"} keyProp={3} active={classNames.active} />
				<ListItem text={"News"} to={"/news"} keyProp={4} active={classNames.active} />
				<ListItem text={"Music"} to={"/music"} keyProp={5} active={classNames.active} />
				<ListItem text={"Settings"} to={"/settings"} keyProp={6} active={classNames.active} />
			</ul>
		</nav>
	);
};

export default Nav;
