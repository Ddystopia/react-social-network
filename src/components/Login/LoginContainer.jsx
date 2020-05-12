import React from "react";
import Login from "./Login";
import { login, getCaptchaUrl } from "../../redux/authReducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import { getIsAuth, getCaptchaUrlSelector, getIsFetchingAuth } from "../../redux/selectors/selectors";

const LoginContainer = ({login, isAuth, isFetching, captchaUrl }) => {
	const loginUser = (formData) => {
		login(formData);
	};
	return isFetching ? (
		<Preloader />
	) : isAuth ? (
		<Redirect to="/profile" />
	) : (
		<Login captchaUrl={captchaUrl} loginUser={loginUser} />
	);
};

const mapStateToProps = (state) => ({
	isAuth: getIsAuth(state),
	isFetching: getIsFetchingAuth(state),
	captchaUrl: getCaptchaUrlSelector(state),
});

const mapDispatchToProps = { login, getCaptchaUrl };

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	LoginContainer
);
