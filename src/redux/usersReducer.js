const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_PAGE = "SET_PAGE";
const SET_USERS_COUNT = "SET_USERS_COUNT";

const initial = {
	users: [],
	page: 1,
	count: 4,
	usersCount: 0,
};

const usersReducer = (state = initial, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map( u => u.id === +action.userId ? {...u, followed: true} : u),
			};
		case UNFOLLOW:
			return {
				...state,
				users: state.users.map( u => u.id === +action.userId ? {...u, followed: false} : u),
			};
		case SET_USERS:
			return {
				...state,
				users: [ ...action.users],
			};
		case SET_PAGE:
			return {
				...state,
				page: action.page,
			};
		case SET_USERS_COUNT:
			return {
				...state,
				usersCount: action.usersCount,
			};
		default:
			return state;
	}
};

const FollowAC = (userId) => ({	type: FOLLOW,	userId: userId, });

const UnFollowAC = (userId) => ({ type: UNFOLLOW, userId: userId, });

const SetUsersAC = (users) => ({ type: SET_USERS, users: users, });

const SePageAC = (page) => ({ type: SET_PAGE, page: page, });

const SetUsersCountAC = (usersCount) => ({ type: SET_USERS_COUNT, usersCount: usersCount, });

export default usersReducer;
export { FollowAC, UnFollowAC, SetUsersAC, SePageAC, SetUsersCountAC };
