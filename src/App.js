import React from "react";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Nav from "./components/Nav/Nav";
import "./App.css";
import { Route } from "react-router-dom";

const App = (props) => {
	const store = props.store;
	return (
			<div className="app_wrapper">
				<Header />
				<Nav />
				<main className="main">
					<Route exact path="/" render={() => <Profile data={store.state.profileData} dispatch={store.dispatch.bind(store)}/>} />
					<Route path="/profile" render={() => <Profile data={store.state.profileData} dispatch={store.dispatch.bind(store)}/>} />
					<Route path="/dialogs" render={() => <Dialogs data={store.state.dialogData} dispatch={store.dispatch.bind(store)}/>} />
				</main>
			</div>
	);
};

export default App;
