const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

const initial = {
	users: [],
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
				users: [...state.users, ...action.users],
			};
		default:
			return state;
	}
};

const FollowAC = (userId) => ({	type: FOLLOW,	userId: userId, });

const UnFollowAC = (userId) => ({ type: UNFOLLOW, userId: userId, });

const SetUsersAC = (users) => ({ type: SET_USERS, users: users, });

export default usersReducer;
export { FollowAC, UnFollowAC, SetUsersAC };
