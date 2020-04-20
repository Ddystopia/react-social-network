import React from "react";
import classNames from "./Dialogs.module.css";
import Chats from "./Chats/Chats";
import Messages from "./Messages/Messages";

const Dialogs = (props) => {
	const chatsData = props.data.chatsData;
	const messagesData = props.data.messagesData;
	return (
		<section className={classNames.content}>
			<Chats data={chatsData} />
			<Messages data={messagesData} />
		</section>
	);
};
export default Dialogs;
