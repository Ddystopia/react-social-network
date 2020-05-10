import { usersAPI } from "../api/api";
import { arrayMapHelper } from "../utils/arrayMapHelper";

const FOLLOW = Symbol();
const UNFOLLOW = Symbol();
const SET_USERS = Symbol();
const SET_PAGE = Symbol();
const SET_COUNT = Symbol();
const SET_USERS_COUNT = Symbol();
const TOGGLE_IS_FETCHING = Symbol();
const TOGGLE_IS_FOLLOWING = Symbol();

const initial = {
	users: [],
	page: 1,
	count: 4,
	usersCount: 0,
	isFetching: false,
	isFollowing: [],
};

const usersReducer = (state = initial, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: arrayMapHelper(state.users, action.userId, "id", {
					followed: true,
				}),
			};
		case UNFOLLOW:
			return {
				...state,
				users: arrayMapHelper(state.users, action.userId, "id", {
					followed: false,
				}),
			};
		case SET_USERS:
			return {
				...state,
				users: [...action.users],
			};
		case SET_PAGE:
			return {
				...state,
				page: action.page,
			};
		case SET_COUNT:
			return {
				...state,
				count: action.count,
			};
		case SET_USERS_COUNT:
			return {
				...state,
				usersCount: action.usersCount,
			};
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		case TOGGLE_IS_FOLLOWING:
			return {
				...state,
				isFollowing: action.isFetching
					? [...state.isFollowing, action.id]
					: state.isFollowing.filter((id) => id !== action.id),
			};
		default:
			return state;
	}
};

const acceptFollow = (userId) => ({ type: FOLLOW, userId });
const acceptUnFollow = (userId) => ({ type: UNFOLLOW, userId });
const setUsers = (users) => ({ type: SET_USERS, users });
const setPage = (page) => ({ type: SET_PAGE, page });
const setCount = (count) => ({ type: SET_COUNT, count });
const setUsersCount = (usersCount) => ({ type: SET_USERS_COUNT, usersCount });
const toggleIsFetching = (isFetching) => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});
const toggleIsFollowing = (isFetching, id) => ({
	type: TOGGLE_IS_FOLLOWING,
	isFetching,
	id,
});

const getUsers = (page, count) => async (dispatch) => {
	dispatch(setPage(page));
	dispatch(toggleIsFetching(true));
	const data = await usersAPI.getUsers(page, count);

	dispatch(setUsers(data.items));
	dispatch(toggleIsFetching(false));
	dispatch(setUsersCount(data.totalCount));
};

const followUnfollowFlow = async (dispatch, method, action, id) => {
	dispatch(toggleIsFollowing(true, id));
	const data = await method(id);
	if (data.resultCode === 0) {
		dispatch(action(id));
		dispatch(toggleIsFollowing(false, id))
	}
};

const follow = (id) => async (dispatch) => {
	followUnfollowFlow(dispatch, usersAPI.followAjax, acceptFollow, id);
};

const unFollow = (id) => async (dispatch) => {
	followUnfollowFlow(dispatch, usersAPI.unFollowAjax, acceptUnFollow, id);
	
};

export default usersReducer;
export { follow, unFollow, getUsers };
export {
	acceptFollow,
	acceptUnFollow,
	setUsers,
	setPage,
	setCount,
	setUsersCount,
};
