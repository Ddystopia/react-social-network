import React from "react";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Nav from "./components/Nav/Nav";
import "./App.css";
import { Route } from "react-router-dom";

const App = (props) => {
	const state = props.state;
	return (
			<div className="app_wrapper">
				<Header />
				<Nav />
				<main className="main">
					<Route exact path="/" render={() => <Profile addPost={props.addPost} changeTextareaValue={props.changeTextareaValue} state={state.profileData}/>} />
					<Route path="/profile" render={() => <Profile addPost={props.addPost} changeTextareaValue={props.changeTextareaValue} state={state.profileData}/>} />
					<Route path="/dialogs" render={() => <Dialogs data={state.dialogData}/>} />
				</main>
			</div>
	);
};

export default App;
