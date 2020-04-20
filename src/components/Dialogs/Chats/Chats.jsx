import React from "react";
import classNames from "./Chats.module.css";
import ChatListItem from "./ChatListItem/ChatListItem";

const Chats = (props) => {
	const listItems = props.data.map(item => <ChatListItem key={item.id} chatName={item.chatName} id={item.id} />)
	return (
		<section className={classNames.chats}>
			<h2>Chats</h2>
			<ul>
				{listItems}
			</ul>
		</section>
	);
};
export default Chats;
