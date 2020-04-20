import React from "react";
import UserInfo from "./UserInfo/UserInfo";
import MyPosts from "./MyPosts/MyPosts";
import classNames from "./Profile.module.css";

const Profile = (props) => {
	const state = props.data;
	return (
		<section className={classNames.content}>
			<img
				className={classNames.img}
				src="http://getwallpapers.com/wallpaper/full/8/8/c/254974.jpg"
				alt="Some back"
			/>
			<UserInfo />
			<MyPosts data={state.postsData} textareaValue={state.textareaValue} dispatch={props.dispatch}/>
		</section>
	);
};
export default Profile;
