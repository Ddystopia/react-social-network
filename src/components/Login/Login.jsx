import React from "react";
import classNames from "./Login.module.css";
import { reduxForm } from "redux-form";
import { Input } from "../common/FormControls/FormControls";
import { required, emailValidation } from "../../utils/validators/validators";
import Row from "./Row/Row";

const LoginForm = ({handleSubmit,	error, loginUser, captchaUrl}) => {
	return (
		<form onSubmit={handleSubmit(loginUser)}>			
			<Row component={Input} type={"email"} name={"email"} placeholder={"Email"} validate={[required, emailValidation]} />		
			<Row component={Input} type={"password"} name={"password"} placeholder={"Password"} validate={[required]} />
			<Row component={"input"} type={"checkbox"} name={"rememberMe"} text={"Remember me"}/>
			{captchaUrl && (<>
				<div className={classNames.captcha} >
					<img src={captchaUrl} alt="captcha"/>
					<Row component={Input} type={"text"} name={"captcha"} placeholder={"Type captcha"} validate={[required]} />
				</div>
			</>)}
			{error && <div className={classNames.error}>{error}</div>}
			<div>
				<button>Submit</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

export default ({loginUser, captchaUrl}) => {
	return (
		<section>
			<h2>Login</h2>
			<LoginReduxForm loginUser={loginUser} captchaUrl={captchaUrl} />
		</section>
	);
};
