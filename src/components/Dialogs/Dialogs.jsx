import React from "react";
import classNames from "./Dialogs.module.css";
import Chats from "./Chats/Chats";
import Messages from "./Messages/Messages";

const Dialogs = (props) => {
	return (
		<section className={classNames.content}>
			<Chats data={props.chatsData} />
			<Messages data={props.messagesData} sendMessage={props.sendMessage} />
		</section>
	);
};
export default Dialogs;
