import React from "react";
import classNames from "./UserInfo.module.css";
import standardAvatar from "../../../assets/images/standardAvatar.jpg";
import UserData from "./UserData/UserData";

const UserInfo = (props) => {
	const contacts = [];
	for (const item in props.profile.contacts) {
		const link = props.profile.contacts[item];
		if (!link) continue;
		contacts.push(
			<li key={link}>
				{item}: <a href={link}>{link}</a>
			</li>
		);
	}
	if (contacts.length === 0) contacts.push(<li key="0">Nothing contacts</li>);

	return (
		<section className={classNames.user_info}>
			<figure className={classNames.avatar}>
				<a href={props.profile.id}>
					<img
						src={props.profile.photos.small || standardAvatar}
						alt="Avatar"
					/>
				</a>
			</figure>
			<UserData
				profile={props.profile}
				updateUserStatus={props.updateUserStatus}
				status={props.status}
				authUserId={props.authUserId}
			/>
			<article>
				<div>Contacts:</div>
				<ul className={classNames.linkList}>{contacts}</ul>
			</article>
		</section>
	);
};

export default UserInfo;
