import React from "react";
import classNames from "./Login.module.css";
import { reduxForm } from "redux-form";
import { Input } from "../common/FormControls/FormControls";
import { required } from "../../utils/validators/validators";
import Row from "./Row/Row";

const LoginForm = ({handleSubmit,	error, loginUser}) => {
	return (
		<form onSubmit={handleSubmit(loginUser)}>			
			<Row component={Input} type={"email"} name={"email"} placeholder={"Email"} validate={[required]} />		
			<Row component={Input} type={"text"} name={"password"} placeholder={"Password"} validate={[required]} />
			<Row component={"input"} type={"checkbox"} name={"rememberMe"} text={"Remember me"}/>
			{error && <div className={classNames.error}>{error}</div>}
			<div>
				<button>Submit</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

export default ({loginUser}) => {
	return (
		<section>
			<h2>Login</h2>
			<LoginReduxForm loginUser={loginUser} />
		</section>
	);
};
