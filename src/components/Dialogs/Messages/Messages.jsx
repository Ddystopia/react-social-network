import React from "react";
import Message from "./Message/Message";
import classNames from "./Messages.module.css";
import SendForm from "./SendForm/SendForm";

const Messages = (props) => {
	const messages = props.data
		.sort((a, b) => a.date - b.date)
		.slice(0, Math.min(props.data.length, 100))
		.map((item) => <Message key={item.id} data={item} />);
//=============Very bad code, it is temporal==========================
	window.onload = () => {
		const element = document.getElementById("messagesDiv");
		element.scrollTop = element.scrollHeight;
	}
//====================================================================
	return (
		<section className={classNames.content}>
			<div id="messagesDiv" className={classNames.messages}>
				{messages}
			</div>
			<SendForm />
		</section>
	);
};

export default Messages;
