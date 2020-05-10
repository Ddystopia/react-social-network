import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import UsersContainer from "./components/Users/UsersContainer";
// import LoginContainer from "./components/Login/LoginContainer";
import Nav from "./components/Nav/Nav";
import "./App.css";
import { Route } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import { withSuspense } from "./hoc/withSuspense";

const UsersContainer = React.lazy(() =>	import("./components/Users/UsersContainer"));
const LoginContainer = React.lazy(() =>	import("./components/Login/LoginContainer"));
class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp();
	}
	render() {
		return this.props.initialized ? (
			<div className="app_wrapper">
				<HeaderContainer />
				<Nav />
				<main className="main">
					<Route path="/profile/:userId?" render={() => <ProfileContainer />} />
					<Route path="/dialogs" render={() => <DialogsContainer />} />
					<Route path="/users" render={withSuspense(UsersContainer)} />
					<Route path="/login" render={withSuspense(LoginContainer)} />
				</main>
			</div>
		) : (
			<Preloader />
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized,
});

export default compose(connect(mapStateToProps, { initializeApp }))(App);
