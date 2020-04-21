import React from "react";
import Message from "./Message/Message";
import classNames from "./Messages.module.css";
import SendForm from "./SendForm/SendForm";
function scrollToDown() {
	const element = document.getElementById("messagesDiv");
	element.scrollTop = element.scrollHeight;
}

const Messages = (props) => {
	const messages = props.data
		.sort((a, b) => a.date - b.date)
		.slice(0, Math.min(props.data.length, 100))
		.map((item) => <Message key={item.id} data={item} />);
	return (
		<section className={classNames.content}>
			<div
				onLoad={scrollToDown}
				id="messagesDiv"
				className={classNames.messages}
			>
				{messages}
			</div>
			<SendForm textareaValue={props.textareaValue} dispatch={props.dispatch} />
		</section>
	);
};

export default Messages;
