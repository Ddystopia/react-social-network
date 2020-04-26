import { createStore, combineReducers } from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";
import usersReducer from "./usersReducer";

const reducers = combineReducers({
	profileData: profileReducer,
	dialogData: dialogReducer,
	usersData: usersReducer,
});
const store = createStore(reducers);

window.store = store;
export default store;
