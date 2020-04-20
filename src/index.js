import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import  { state, addPost, changeTextareaValue, subscribe } from "./state";
import { BrowserRouter } from "react-router-dom";

const renderEntireState = () => {
	ReactDOM.render(
		<React.StrictMode>
			<BrowserRouter>
				<App addPost={addPost} changeTextareaValue={changeTextareaValue} state={state} />
			</BrowserRouter>
		</React.StrictMode>,
		document.getElementById("root")
	);
};
subscribe(renderEntireState);
renderEntireState();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
