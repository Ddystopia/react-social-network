import React from "react";
import renderer from "react-test-renderer";
import App from "./App";
import store from "./redux/reduxStore";
import { Provider } from "react-redux";

test("renders learn react link", () => {
	const component = renderer.create(
		<Provider store={store}>
			<App />
		</Provider>
	);
});
