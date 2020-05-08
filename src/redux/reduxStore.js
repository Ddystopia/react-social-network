import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form"

const reducers = combineReducers({
	profileData: profileReducer,
	dialogData: dialogReducer,
	usersData: usersReducer,
	auth: authReducer,
	app: appReducer,
	form: formReducer,
});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;
