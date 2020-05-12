import React from "react";
import { reduxForm, Field } from "redux-form";
import classNames from "./Form.module.css";
import {
	required,
	maxLengthCreator,
	minLengthCreator,
} from "../../../../utils/validators";
import { Textarea } from "../../../common/FormControls/FormControls";

const maxLength300 = maxLengthCreator(300);
const minLength10 = minLengthCreator(10);

const Form = ({ handleSubmit, addPost, reset }) => {
	return (
		<form
			className={classNames.form}
			onSubmit={handleSubmit((formData) => {
				addPost(formData.message);
				reset()
			})}
		>
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

export default reduxForm({ form: "addPost" })(Form);
