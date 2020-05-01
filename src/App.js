import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Nav from "./components/Nav/Nav";
import UsersContainer from "./components/Users/UsersContainer";
import "./App.css";
import { Route } from "react-router-dom";

const App = (props) => {
	return (
			<div className="app_wrapper">
				<HeaderContainer />
				<Nav />
				<main className="main">
					<Route path="/profile/:userId?" render={() => <ProfileContainer/>} />
					<Route path="/dialogs" render={() => <DialogsContainer/>} />
					<Route path="/users" render={() => <UsersContainer />} />
				</main>
			</div>
	);
};

export default App;
