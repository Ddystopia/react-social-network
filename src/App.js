import React from "react";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Nav from "./components/Nav/Nav";
import UsersContainer from "./components/Users/UsersContainer";
import "./App.css";
import { Route } from "react-router-dom";

const App = (props) => {
	return (
			<div className="app_wrapper">
				<Header />
				<Nav />
				<main className="main">
					<Route exact path="/" render={() => <Profile/>} />
					<Route path="/profile" render={() => <Profile/>} />
					<Route path="/dialogs" render={() => <Dialogs/>} />
					<Route path="/users" render={() => <UsersContainer />} />
				</main>
			</div>
	);
};

export default App;
