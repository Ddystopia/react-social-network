import React from "react";
import Login from "./Login";
import { login } from "../../redux/authReducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";

const LoginContainer = (props) => {
	const loginUser = (formData) => {
		props.login(formData);
	};
	return props.isFetching ? (
		<Preloader />
	) : props.isAuth ? (
		<Redirect to="/profile" />
	) : (
		<Login loginUser={loginUser} />
	);
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	isFetching: state.auth.isFetching,
});

const mapDispatchToProps = { login };

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	LoginContainer
);
