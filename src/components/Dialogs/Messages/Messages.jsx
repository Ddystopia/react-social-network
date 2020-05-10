import React from "react";
import Message from "./Message/Message";
import classNames from "./Messages.module.css";
import SendForm from "./SendForm/SendForm";
function scrollToDown(e) {
	const element = e.target;
	element.scrollTop = element.scrollHeight;
}

export default ({ data, textareaValue, sendMessage, changeTextareaValue }) => {
	const messages = data
		.sort((a, b) => a.date - b.date)
		.slice(0, Math.min(data.length, 100))
		.map((item) => <Message key={item.id} data={item} />);
	return (
		<section className={classNames.content}>
			<div onLoad={scrollToDown} className={classNames.messages}>
				{messages}
			</div>
			<SendForm
				textareaValue={textareaValue}
				sendMessage={sendMessage}
				changeTextareaValue={changeTextareaValue}
			/>
		</section>
	);
};
