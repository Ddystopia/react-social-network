import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const CHANGE_TEXTAREA_VALUE = "CHANGE_TEXTAREA_VALUE";
const SET_PROFILE_USER = "SET_PROFILE_USER";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_USER_STATUS = "SET_USER_STATUS";

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
	textareaValue: "",
	isFetching: false,
	status: "",
};

const profileReducer = (state = initial, action) => {
	switch (action.type) {
		case ADD_POST:
			if (
				state.textareaValue.trim().length < 10 ||
				state.textareaValue.trim().length > 1000
			)
				return state;
			const postObj = {
				id: state.postsData[state.postsData.length - 1].id + 1,
				message: state.textareaValue.trim(),
				likesCount: 0,
			};
			return {
				...state,
				postsData: [...state.postsData, postObj],
				textareaValue: "",
			};
		case CHANGE_TEXTAREA_VALUE:
			return { ...state, textareaValue: action.value };
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

const addPost = () => ({ type: ADD_POST });
const changeTextareaValue = (value) => ({ type: CHANGE_TEXTAREA_VALUE, value });
const setProfileUser = (profile) => ({ type: SET_PROFILE_USER, profile });
const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });

const setProfile = (userId) => (dispatch) => {
	profileAPI.getProfile(userId).then((data) => {
		dispatch(setProfileUser(data));
	});
};

const getUserStatus = (userId) => (dispatch) => {
	profileAPI.getUserStatus(userId).then((data) => {
		dispatch(setUserStatus(data));
	});
};

const updateUserStatus = (status) => (dispatch) => {
	profileAPI.setUserStatus(status).then((data) => {
		if (data.resultCode === 0) {
			dispatch(setUserStatus(status));
		}
	});
};

export default profileReducer;
export { setProfile, getUserStatus, updateUserStatus, addPost, changeTextareaValue };
