import React from "react";
import classNames from "./SendForm.module.css";

function textareaAdjust(o) {
  o.style.height = "1px";
  o.style.height = `${4 + o.scrollHeight}px`;
}

const SendForm = (props) => {
	
	const sendMessage = () => {
		props.sendMessage()
	};
	const changeTextareaValue = (event) => {
		const textarea = event.target;
		const value = textarea.value;
		textareaAdjust(textarea)
		
		if (value.length > 1000) textarea.classList.add(classNames.warning);
		else textarea.classList.remove(classNames.warning)
		
		props.changeTextareaValue(value);
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
