import React from "react";
import classNames from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
	return (
		<header className={classNames.header}>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"
				alt="logo"
			/>
			<div className={classNames.loginDiv} ><NavLink to={"/login"}>{props.login || "login"}</NavLink></div>
		</header>
	);
};
export default Header;
