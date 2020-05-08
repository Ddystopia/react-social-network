import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import { compose } from "redux";

class HeaderContainer extends React.Component {
	render() {
		return this.props.isAuth ? (
			<Header
				logout={this.props.logout}
				login={this.props.login}
				isAuth={this.props.isAuth}
			/>
		) : (
			<Header isAuth={this.props.isAuth} />
		);
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
});

const mapDispatchToProps = { logout };

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	HeaderContainer
);
