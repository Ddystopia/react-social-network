import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import { compose } from "redux";
import { getIsAuth, getLogin } from "../../redux/selectors/selectors";

const HeaderContainer = ({ logout, login, isAuth }) => {
	return isAuth ? (
		<Header logout={logout} login={login} isAuth={isAuth} />
	) : (
		<Header />
	);
};

const mapStateToProps = (state) => ({
	isAuth: getIsAuth(state),
	login: getLogin(state),
});

const mapDispatchToProps = { logout };

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	HeaderContainer
);
