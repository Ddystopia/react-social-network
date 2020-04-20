import React from "react";
import classNames from "./ChatListItem.module.css";
import { NavLink } from "react-router-dom";

const ChatListItem = (props) => {
	return (
		<li>
			<NavLink
				activeClassName={classNames.active}
				to={`/dialogs/chat/${props.id}`}
			>
				{props.chatName}
			</NavLink>
		</li>
	);
};

export default ChatListItem;