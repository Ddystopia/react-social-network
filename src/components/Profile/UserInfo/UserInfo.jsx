import React from "react";
import classNames from "./UserInfo.module.css";
import standardAvatar from "../../../assets/images/standardAvatar.jpg";

const UserInfo = (props) => {
	const contacts = [];	
	for(const item in props.profile.contacts){
		const link = props.profile.contacts[item];
		if(!link) continue;
		contacts.push(<li key={link}>{item}: <a href={link}>{link}</a></li>)
	}
	if(contacts.length === 0) contacts.push(<li key="0">Nothing contacts</li>)

	return (
		<section className={classNames.user_info}>
			<figure className={classNames.avatar}>
				<a href={props.profile.id}><img src={props.profile.photos.small || standardAvatar} alt="Avatar" /></a>
			</figure>
			<article className={classNames.user_info_text}>
				<h3>{props.profile.fullName}</h3>
				<div>About me: {props.profile.aboutMe}</div>
				<div>
					Looking for a job:
					<div
						className={classNames.circle}
						style={{
							backgroundColor: props.profile.lookingForAJob ? "green" : "red",
						}}
					></div>
					{props.profile.lookingForAJobDescription}
				</div>
			</article>
			<article>
				<div>Contacts:</div>
				<ul className={classNames.linkList}>
					{contacts}
				</ul>
			</article>
		</section>
	);
};
export default UserInfo;
