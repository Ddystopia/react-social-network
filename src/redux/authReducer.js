import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const TOGGLE_IS_FETCHING = Symbol();
const SET_AUTH_USER = Symbol();

const initial = {
	email: null,
	login: null,
	userId: null,
	isAuth: false,
	isFetching: false,
};

const authReducer = (state = initial, action) => {
	switch (action.type) {
		case SET_AUTH_USER:
			return {
				...state,
				...action.data,
				isAuth: action.isAuth,
			};
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		default:
			return state;
	}
};

const setAuthUser = (userId, email, login) => ({
	type: SET_AUTH_USER,
	data: { userId, email, login },
	isAuth: true,
});

const logoutUser = () => ({
	type: SET_AUTH_USER,
	data: { userId: null, email: null, login: null },
	isAuth: false,
});

const toggleIsFetching = (isFetching) => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});

const authUser = () => (dispatch) => {
	dispatch(toggleIsFetching(true));
	return authAPI.me().then((r) => {
		if (r.resultCode === 0) {
			const { id, email, login } = r.data;
			dispatch(setAuthUser(id, email, login));
		} else dispatch(logoutUser());
		dispatch(toggleIsFetching(false));
	});
};

const login = (formData) => (dispatch) => {
	authAPI.login(formData).then((r) => {
		switch (r.resultCode) {
			case 0:
				dispatch(authUser())
				break;
			case 1:
				dispatch(stopSubmit("login", { _error: r.messages.join('\n') }));
				break;
			default:
				dispatch(stopSubmit("login", { _error: "something wrong" }));
		}
	});
};

const logout = () => (dispatch) => {
	authAPI.logout().then((r) => {
		if (r.resultCode === 0) {
			dispatch(authUser())
		}
	});
};

export { authUser, login, logout };
export default authReducer;
