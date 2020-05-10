import React from "react";
import classNames from "./ChatListItem.module.css";
import { NavLink } from "react-router-dom";

const ChatListItem = ({ chatName, id }) => {
	return (
		<li className={classNames.li}>
			<NavLink activeClassName={classNames.active} to={`/dialogs/chat/${id}`}>
				{chatName}
			</NavLink>
		</li>
	);
};

export default ChatListItem;
