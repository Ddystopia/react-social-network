import React from "react";
import classNames from "./Dialogs.module.css";
import Chats from "./Chats/Chats";
import Messages from "./Messages/Messages";

const Dialogs = (props) => {
	const state = props.data;
	return (
		<section className={classNames.content}>
			<Chats data={state.chatsData} />
			<Messages data={state.messagesData} textareaValue={state.textareaValue} dispatch={props.dispatch}/>
		</section>
	);
};
export default Dialogs;
