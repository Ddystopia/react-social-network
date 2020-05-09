import { usersAPI } from "../api/api";

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
				users: state.users.map((u) =>
					u.id === +action.userId ? { ...u, followed: true } : u
				),
			};
		case UNFOLLOW:
			return {
				...state,
				users: state.users.map((u) =>
					u.id === +action.userId ? { ...u, followed: false } : u
				),
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
const toggleIsFetching = (isFetching) => ({	type: TOGGLE_IS_FETCHING,	isFetching });
const toggleIsFollowing = (isFetching, id) => ({ type: TOGGLE_IS_FOLLOWING,	isFetching,	id });

const getUsers = (page, count) => (dispatch) => {
	dispatch(setPage(page));
	dispatch(toggleIsFetching(true));
	usersAPI.getUsers(page, count).then((data) => {
		dispatch(setUsers(data.items));
		dispatch(toggleIsFetching(false));
		dispatch(setUsersCount(data.totalCount));
	});
};

const follow = (id) => (dispatch) => {
	dispatch(toggleIsFollowing(true, id));
	usersAPI.followAjax(id).then((data) => {
		if (data.resultCode !== 0) return;
		dispatch(acceptFollow(id));
		dispatch(toggleIsFollowing(false, id));
	});
};

const unFollow = (id) => (dispatch) => {
	dispatch(toggleIsFollowing(true, id));
	usersAPI.unFollowAjax(id).then((data) => {
		if (data.resultCode !== 0) return;
		dispatch(acceptUnFollow(id));
		dispatch(toggleIsFollowing(false, id));
	});
};

export default usersReducer;
export { follow, unFollow, getUsers };
export { acceptFollow, acceptUnFollow, setUsers, setPage, setCount, setUsersCount };
