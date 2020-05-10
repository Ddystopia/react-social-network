import React from "react";
import classNames from "./MyPosts.module.css";
import Post from "./Post/Post";
import Form from "./Form/Form";

const MyPosts = ({ data, addPost }) => {
	const postMessages = data
		.map((item) => <Post {...item} key={item.id} />)
		.reverse();

	const addPostHandle = (message) => {
		addPost(message);
	};

	return (
		<div className={classNames.posts}>
			<h2>My posts</h2>
			<Form addPost={addPostHandle} />
			<section>{postMessages}</section>
		</div>
	);
};
export default MyPosts;
