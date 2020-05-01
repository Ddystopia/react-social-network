import React from "react";
import classNames from "./User.module.css";
import standardAvatar from "../../../assets/images/standardAvatar.jpg";
import { NavLink } from "react-router-dom";

const User = (props) => {
	return (
		<li className={classNames.li}>
			<div className={classNames.info}>
				<h3>{props.data.name}</h3>
				<h4>Male</h4>
				<p>{props.data.status}</p>
			</div>
			<NavLink className={classNames.avatarWrapper} to={`profile/${props.id}`}>
				<img
					className={classNames.avatar}
					src={props.data.photos.small || standardAvatar}
					alt="avatar"
				/>
			</NavLink>
			{
				<button
					className={classNames.butt}
					disabled={props.disabled}
					onClick={props.data.followed ?  () => props.unFollow(props.data.id) : () => props.follow(props.data.id)}
				>
					{props.data.followed ? "Unfollow" : "Follow"}
				</button>
			}
		</li>
	);
};

export default User;
