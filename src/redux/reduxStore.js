import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"

const reducers = combineReducers({
	profileData: profileReducer,
	dialogData: dialogReducer,
	usersData: usersReducer,
	auth: authReducer,
});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;
