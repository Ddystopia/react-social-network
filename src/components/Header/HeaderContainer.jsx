import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import { compose } from "redux";

const HeaderContainer = ({ logout, login, isAuth }) => {
	return isAuth ? (
		<Header logout={logout} login={login} isAuth={isAuth} />
	) : (
		<Header />
	);
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
});

const mapDispatchToProps = { logout };

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	HeaderContainer
);
