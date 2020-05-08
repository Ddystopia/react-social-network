import React from "react";
import classNames from "./MyPosts.module.css";
import Post from "./Post/Post";
import Form from "./Form/Form";

const MyPosts = (props) => {
	const postMessages = props.data
		.map((item) => (
			<Post
				message={item.message}
				header={item.header}
				likesCount={item.likesCount}
				id={item.id}
				key={item.id}
			/>
		))
		.reverse();

	const addPost = (message) => {
		props.addPost(message);
	};

	return (
		<div className={classNames.posts}>
			<h2>My posts</h2>
			<Form addPost={addPost} />
			<section>{postMessages}</section>
		</div>
	);
};
export default MyPosts;
