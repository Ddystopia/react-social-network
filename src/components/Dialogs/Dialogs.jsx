import React from "react";
import classNames from "./Dialogs.module.css";
import ChatsContainer from "./Chats/ChatsContainer";
import MessagesContainer from "./Messages/MessagesContainer";

const Dialogs = (props) => {
	return (
		<section className={classNames.content}>
			<ChatsContainer />
			<MessagesContainer />
		</section>
	);
};
export default Dialogs;
