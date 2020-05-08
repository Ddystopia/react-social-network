import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render() {
			if (!this.props.isAuth) return <Redirect to="/login" />;

			return <Component {...this.props} />;
		}
	}
	const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth });

	return compose(connect(mapStateToProps))(RedirectComponent);
};

export { withAuthRedirect };