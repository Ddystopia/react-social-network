import React from "react";
import classNames from "./MyPosts.module.css";
import Post from "./Post/Post";

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

	const sendPostButton = React.createRef();

	const changeTextareaValue = () => {
		const value = sendPostButton.current.value;
		return props.dispatch({ type: "CHANGE-TEXTAREA-VALUE", value: value });
	};
	const addPost = () => {
		const message = sendPostButton.current.value;
		if (message.length < 5 || message.length > 500) return;
		props.dispatch({ type: "CHANGE-TEXTAREA-VALUE", value: '' });
		return props.dispatch({ type: "ADD-POST", message: message });
	};

	return (
		<div className={classNames.posts}>
			<h2>My posts</h2>
			<form name="newPost" className="newPost">
				<textarea
					onChange={changeTextareaValue}
					value={props.textareaValue}
					ref={sendPostButton}
				/>
				<input onClick={addPost} value="Send" type="button" />
			</form>
			<section>{postMessages}</section>
		</div>
	);
};
export default MyPosts;
