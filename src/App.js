import React from "react";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Nav from "./components/Nav/Nav";
import "./App.css";
import { Route } from "react-router-dom";

const App = (props) => {
	return (
			<div className="app_wrapper">
				<Header />
				<Nav />
				<main className="main">
					<Route exact path="/" render={() => <Profile data={props.state.profileData} dispatch={props.dispatch}/>} />
					<Route path="/profile" render={() => <Profile data={props.state.profileData} dispatch={props.dispatch}/>} />
					<Route path="/dialogs" render={() => <Dialogs data={props.state.dialogData} dispatch={props.dispatch}/>} />
				</main>
			</div>
	);
};

export default App;
