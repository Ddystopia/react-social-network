import React from "react";
import classNames from "./Users.module.css";
import User from "./User/User";
import * as axios from "axios";

class Users extends React.Component{
	constructor(props){
		super(props);
		if (this.props.data.length === 0) {
			axios
				.get("https://social-network.samuraijs.com/api/1.0/users", {
					headers: { "API-KEY": "95847efd-3fd3-4ea1-80b2-dc9c97cbd7d6" },
				})
				.then((r) => this.props.setUsers(r.data.items));
		}
	}
	render() {
		const users = this.props.data.map((u) => (
			<User
				key={u.id}
				data={u}
				follow={this.props.follow}
				unFollow={this.props.unFollow}
			/>
		));
		return (
			<section className={classNames.content}>
				<ul className={classNames.usersList}>{users}</ul>
				<button className={classNames.butt}>Load more</button>
			</section>
		)
	}
}

export default Users;
