import React from "react";
import { reduxForm, Field } from "redux-form";
import classNames from "./Form.module.css";
import {
	required,
	maxLengthCreator,
	minLengthCreator,
} from "../../../../utils/validators/validators";
import { Textarea } from "../../../common/FormControls/FormControls";

const maxLength300 = maxLengthCreator(300);
const minLength10 = minLengthCreator(10);

const Form = (props) => {
	return (
		<form className={classNames.form} onSubmit={props.handleSubmit}>
			<Field
				component={Textarea}
				className={classNames.textarea} 
				placeholder="Type new post"
				name="message"
				validate={[required, maxLength300, minLength10]}
			/>
			<button>Send</button>
		</form>
	);
};

const ReduxForm = reduxForm({ form: "addPost" })(Form);

export default (props) => (
	<ReduxForm onSubmit={(formData) => props.addPost(formData.message)} />
);
