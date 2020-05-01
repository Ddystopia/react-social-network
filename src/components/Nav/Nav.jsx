import React from "react";
import classNames from "./Nav.module.css";
import { NavLink } from "react-router-dom";

class Nav extends React.Component {
	state = { menuIsHidden: window.innerWidth < 761 ? true : false };
	menuChange = () =>
		this.setState((state) => ({ menuIsHidden: !state.menuIsHidden }));
	render() {
		return (
			<nav className={classNames.nav}>
				<div className={classNames.menuButton} onClick={this.menuChange}>
					Menu
				</div>
				<ul id="menu" hidden={this.state.menuIsHidden}>
					<li>
						<NavLink activeClassName={classNames.active} to="/profile">
							Profile
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName={classNames.active} to="/dialogs">
							Messages
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName={classNames.active} to="/users">
							Users
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName={classNames.active} to="/news">
							News
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName={classNames.active} to="/music">
							Music
						</NavLink>
					</li>
					<li className={classNames.empty}></li>
					<li>
						<NavLink activeClassName={classNames.active} to="/settings">
							Settings
						</NavLink>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Nav;
