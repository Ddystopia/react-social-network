import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { authUser } from "../../redux/authReducer";

class HeaderContainer extends React.Component {
	componentDidMount() {
		if (!this.props.isAuth) this.props.authUser()
	}
	render() {
		return this.props.isAuth ? <Header login={this.props.login} /> : <Header />;
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
});

const mapDispatchToProps = { authUser };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
