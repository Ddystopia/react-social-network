import React from "react";
import classNames from "./Message.module.css";
import classNamesSelf from "./MessageSelf.module.css";
import classNamesElse from "./MessageElse.module.css";

const Message = (props) => {
	const thisDate = new Date();
	const date = props.data.date;
	const dateObj = {
		y: date.getFullYear(),
		month: date.getMonth(),
		d: date.getDate(),
		h: date.getHours(),
		m: date.getMinutes(),
	};
	let resDate = "";

	if (thisDate.getDate() !== dateObj.d) {
		if (
			thisDate.getDate() - dateObj.d === 1 &&
			thisDate.getMonth() === dateObj.month &&
			thisDate.getFullYear() === dateObj.y
		)
			resDate += "Yesterday ";
		else resDate += `${dateObj.y}-${dateObj.month}-${dateObj.d} `;
	}
	resDate += `${dateObj.h}:${dateObj.m}`;

	return (
		<article className={props.data.self ? classNamesSelf.message : classNamesElse.message}>
			<img
				alt="avatar"
				src="https://profilepicture7.com/img/img_dongman/1/699918823.jpg"
			/>
			<div className={classNames.content}>
				{props.data.message}
				<div className={props.data.self ? classNamesSelf.date : classNamesElse.date} style={{width:`${resDate.length}ch`}}>{resDate}</div>
			</div>
		</article>
	);
};

export default Message;
