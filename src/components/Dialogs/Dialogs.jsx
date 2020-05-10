import React from "react";
import classNames from "./Dialogs.module.css";
import Chats from "./Chats/Chats";
import Messages from "./Messages/Messages";

const Dialogs = ({ chatsData, messagesData, sendMessage }) => {
	return (
		<section className={classNames.content}>
			<Chats data={chatsData} />
			<Messages data={messagesData} sendMessage={sendMessage} />
		</section>
	);
};
export default Dialogs;
