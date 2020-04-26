import React from "react";
import UserInfo from "./UserInfo/UserInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classNames from "./Profile.module.css";

const Profile = (props) => {
	return (
		<section className={classNames.content}>
			<img
				className={classNames.img}
				src="http://getwallpapers.com/wallpaper/full/8/8/c/254974.jpg"
				alt="Some back"
			/>
			<UserInfo />
			<MyPostsContainer/>
		</section>
	);
};
export default Profile;
