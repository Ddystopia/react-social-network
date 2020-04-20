import React from "react";
import classNames from "./SendForm.module.css";

const SendForm = (props) => {
	return (
		<div className={classNames.posts}>
			<form name="newPost" className="newPost">
				<textarea></textarea>
				<input value="Send" type="button" />
			</form>
		</div>
	);
};

export default SendForm;
