import React from "react";
import classNames from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
	const logout = () => {
		props.logout()
	};
	return (
		<header className={classNames.header}>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"
				alt="logo"
			/>
			<div className={classNames.loginDiv}>
				{props.isAuth ? (
					<>
						<div>{props.login}</div>
						<div className={classNames.logAct} onClick={logout}>Logout</div>
					</>
				) : (
					<NavLink className={classNames.logAct} to={"/login"}>{"login"}</NavLink>
				)}
			</div>
		</header>
	);
};
export default Header;
