import { profileAPI } from "../api/api";

const ADD_POST = Symbol();
const REMOVE_POST = Symbol();
const SET_PROFILE_USER = Symbol();
const TOGGLE_IS_FETCHING = Symbol();
const SET_USER_STATUS = Symbol();

const initial = {
	postsData: [
		{
			id: 1,
			message:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque, facere aperiam pariatur excepturi",
			likesCount: 0,
		},
		{
			id: 2,
			message:
				" quis ex reiciendis nulla quas impedit tempore reprehenderit ad harum, explicabo itaque praesentium optio saepe. Tempora alias consequatur aliquam ad! Natus animi aliquam magni ullam tempora qui, deserunt id eos rem harum, velit sed tempore corporis aliquid eligendi saepe cum dolorem ipsa totam placeat? Voluptas distinctio ullam animi consectetur at dolore enim laborum amet, nam minima non, doloribus aliquam! Cumque sequi sed",
			likesCount: 0,
		},
		{
			id: 3,
			message:
				"tempora qui, deserunt id eos rem harum, velit sed tempore corporis aliquid eligendi saepe cum dolorem ipsa totam placeat? Voluptas distinctio ullam animi consectetur at dolore enim laborum amet, nam minima non, doloribus aliquam! Cumque sequi sed",
			likesCount: 0,
		},
		{
			id: 4,
			message:
				"et blanditiis, nostrum neque. Facere ipsa odio a nisi pariatur tempora sequi. Enim expedita numquam voluptatibus sint nemo et fuga nulla blanditiis qu",
			likesCount: 0,
		},
	],
	profile: null,
	isFetching: false,
	status: "",
};

const profileReducer = (state = initial, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				postsData: [
					...state.postsData,
					{
						id: state.postsData[state.postsData.length - 1].id + 1,
						message: action.message,
						likesCount: 0,
					},
				],
			};
		case REMOVE_POST:
			return {
				...state,
				postsData: state.postsData.filter((post) => post.id !== action.id),
			};
		case SET_PROFILE_USER:
			return { ...state, profile: action.profile };
		case SET_USER_STATUS:
			return { ...state, status: action.status };
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		default:
			return state;
	}
};

const addPost = (message) => ({ type: ADD_POST, message });
const removePost = (id) => ({ type: REMOVE_POST, id });
const setProfileUser = (profile) => ({ type: SET_PROFILE_USER, profile });
const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
const toggleIsFetching = (isFetching) => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});

const setProfile = (userId) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	const data = await profileAPI.getProfile(userId);
	dispatch(setProfileUser(data));
	dispatch(toggleIsFetching(false));
};

const getUserStatus = (userId) => async (dispatch) => {
	const data = await profileAPI.getUserStatus(userId);
	dispatch(setUserStatus(data));
};

const updateUserStatus = (status) => async (dispatch) => {
	const data = await profileAPI.setUserStatus(status);
	if (data.resultCode === 0) {
		dispatch(setUserStatus(status));
	}
};

export default profileReducer;
export {
	setProfile,
	getUserStatus,
	updateUserStatus,
	addPost,
	removePost,
	setProfileUser,
	setUserStatus,
};
