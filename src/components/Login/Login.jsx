import React from "react";
import classNames from "./Login.module.css";
import { reduxForm, Field } from "redux-form";
import { Input } from "../common/FormControls/FormControls";
import { required } from "../../utils/validators/validators";

const LoginForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Input} type={"email"} name={"email"} placeholder={"Email"} validate={[required]} />
			</div>
			<div>
				<Field component={Input} type={"text"} name={"password"} placeholder={"Password"} validate={[required]} />
			</div>
			<div>
				Remember me 
				<Field component={"input"} type={"checkbox"} name={"rememberMe"} />
			</div>
			<div>
				captcha 
				<Field component={"input"} type={"checkbox"} name={"captcha"} />
			</div>
			{props.error && <div className={classNames.error}>{props.error}</div>}
			<div>
				<button>Submit</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
	const onSubmit = (formData) => {
		props.loginUser(formData)
	}
	return (
		<section>
			<h2>Login</h2>
			<LoginReduxForm onSubmit={onSubmit} />
		</section>
	);
};

export default Login;
