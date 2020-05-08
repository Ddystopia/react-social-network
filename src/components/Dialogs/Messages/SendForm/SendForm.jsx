import React from "react";
import classNames from "./SendForm.module.css";
import { reduxForm, Field } from "redux-form";
import { Textarea } from "../../../common/FormControls/FormControls";
import { required, maxLengthCreator } from "../../../../utils/validators/validators";

const maxLength300 = maxLengthCreator(300);

const SendForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit} className={classNames.posts}>
			<Field
				className={classNames.textarea}
				component={Textarea}
				name={"message"}
				placeholder={"Type new message"}
				validate={[required, maxLength300]}
			/>
			<button>Send</button>
		</form>
	);
};

const SendMessageReduxForm = reduxForm({ form: "sendMessage" })(SendForm);

export default (props) => (
	<SendMessageReduxForm
		onSubmit={(formData) => props.sendMessage(formData.message)}
	/>
);
