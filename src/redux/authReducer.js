import { authMe } from "../api/api";

const SET_AUTH_USER = "SET_AUTH_USER";
const initial = {
	email: null,
	login: null,
	userId: null,
	isAuth: false,
};

const authReducer = (state = initial, action) => {
	switch (action.type) {
		case SET_AUTH_USER:
			return {
				...state,
				...action.data,
				isAuth: true,
			};
		default:
			return state;
	}
};

const setAuthUser = (userId, email, login) => ({
	type: SET_AUTH_USER,
	data: { userId, email, login },
});

const authUser = () => (dispatch) => {
	authMe().then((r) => {
		if (r.resultCode !== 0) return;
		const { id, email, login } = r.data;
		dispatch(setAuthUser(id, email, login));
	});
};

export { authUser };
export default authReducer;
