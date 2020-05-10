import React from "react";
import classNames from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = ({ logout, isAuth, login }) => {
	return (
		<header className={classNames.header}>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"
				alt="logo"
			/>
			<div className={classNames.loginDiv}>
				{isAuth ? (
					<>
						<div>{login}</div>
						<div className={classNames.logAct} onClick={logout}>
							<button>Logout</button>
						</div>
					</>
				) : (
					<NavLink className={classNames.logAct} to={"/login"}>
						<button>Login</button>
					</NavLink>
				)}
			</div>
		</header>
	);
};
export default Header;
