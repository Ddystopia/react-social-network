import { authUser } from "./authReducer";

const SET_INITIALIZED_SUCCESS = Symbol();

const initial = {
	initialized: false,
};

const appReducer = (state = initial, action) => {
	switch (action.type) {
		case SET_INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true,
			};
		default:
			return state;
	}
};

const initializeSuccess = () => ({ type: SET_INITIALIZED_SUCCESS });

const initializeApp = () => (dispatch) => {
	const dispatchResult = dispatch(authUser());
	Promise.all([dispatchResult]).then(() => {
		debugger
		dispatch(initializeSuccess());
	});
};

export { initializeApp, initializeSuccess };
export default appReducer;
