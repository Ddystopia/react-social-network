import React from "react";
import classNames from "./SendForm.module.css";
import {
	ChangeMessageTextareaActionCreator,
	SendMessageActionCreator,
} from '../../../../redux/dialogReducer';

function textareaAdjust(o) {
  o.style.height = "1px";
  o.style.height = `${4 + o.scrollHeight}px`;
}

const SendForm = (props) => {
	
	const sendMessage = () => {
		return props.dispatch(new SendMessageActionCreator());
	};
	const changeTextareaValue = (event) => {
		const textarea = event.target;
		const value = textarea.value;
		textareaAdjust(textarea)
		if (value.length > 1000) textarea.classList.add(classNames.warning);
		else textarea.classList.remove(classNames.warning)
		return props.dispatch(new ChangeMessageTextareaActionCreator(value));
	};
	return (
		<div className={classNames.posts}>
			<form name="newPost" className="newPost">
				<textarea className={classNames.textarea} onChange={changeTextareaValue} value={props.textareaValue}/>
				<input onClick={sendMessage} value="Send" type="button" />
			</form>
		</div>
	);
};

export default SendForm;
