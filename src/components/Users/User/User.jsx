import React from "react";
import classNames from "./User.module.css";

const User = (props) => {
	return (
		<li className={classNames.li}>
			<div className={classNames.info}>
				<h3>{props.data.name}</h3>
				<h4>Male</h4>
				<p>{props.data.status}</p>
			</div>
			<img
				className={classNames.avatar}
				src={props.data.photos.small || "https://66.media.tumblr.com/0275b304a43db7298da2fb7d84fded83/tumblr_nacu2a5MJE1r1y69ho3_500.jpg"}
				alt="avatar"
			/>
			{
				<button
					className={classNames.butt}
					onClick={
						props.data.followed
							? () => props.unFollow(props.data.id)
							: () => props.follow(props.data.id)
					}
				>
					{props.data.followed ? "Unfollow" : "Follow"}
				</button>
			}
		</li>
	);
};

export default User;
