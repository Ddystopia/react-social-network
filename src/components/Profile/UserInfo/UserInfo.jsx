import React from "react";
import classNames from "./UserInfo.module.css";
import standardAvatar from "../../../assets/images/standardAvatar.jpg";
import UserData from "./UserData/UserData";
import Contacts from "./Contacts";

const UserInfo = ({ profile, updateUserStatus, status, authUserId }) => {
	return (
		<section className={classNames.user_info}>
			<figure className={classNames.avatar}>
				<a href={profile.id}>
					<img src={profile.photos.small || standardAvatar} alt="Avatar" />
				</a>
			</figure>
			<UserData
				profile={profile}
				updateUserStatus={updateUserStatus}
				propStatus={status}
				authUserId={authUserId}
			/>
			<article>
				<div>Contacts:</div>
				<Contacts profile={profile} />
			</article>
		</section>
	);
};

export default UserInfo;
