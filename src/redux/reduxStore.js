import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";
import { createStore, combineReducers } from "redux";

const reducers = combineReducers({
	profileData: profileReducer,
	dialogData: dialogReducer,
});
const store = createStore(reducers);

window.store = store;
export default store;
