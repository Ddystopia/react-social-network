import usersReducer, { acceptFollow, acceptUnFollow, setUsers, setPage, setCount, setUsersCount } from "../usersReducer";

const state = {
	users: [
		{
			name: "Snegurjan",
			id: 1,
			uniqueUrlName: null,
			photos: {
				small: null,
				large: null,
			},
			status: null,
			followed: false,
		},
	],
	page: 1,
	count: 4,
	usersCount: 0,
	isFetching: false,
	isFollowing: [],
};

test("should follow", () => {
	const action = acceptFollow(1);

	const newState = usersReducer(state, action);

	expect(newState.users[0].followed).toBe(true);
});

test("should unfollow", () => {
	const action = acceptUnFollow(7932);

	const newState = usersReducer(state, action);

	expect(newState.users[0].followed).toBe(false);
});

test("should set page number 2", () => {
	const action = setPage(2);

	const newState = usersReducer(state, action);

	expect(newState.page).toBe(2);
});

test("should set count to 2", () => {
	const action = setCount(2);

	const newState = usersReducer(state, action);

	expect(newState.count).toBe(2);
});

test("users length should increment", () => {
	const action = setUsers([		
		{
			name: "Snegurjan",
			id: 1,
			uniqueUrlName: null,
			photos: {
				small: null,
				large: null,
			},
			status: null,
			followed: false,
		},
		{
			name: "Sasha",
			id: 2,
			uniqueUrlName: null,
			photos: {
				small: null,
				large: null,
			},
			status: null,
			followed: false,
		}
	]);

	const newState = usersReducer(state, action);

	expect(newState.users.length).toBe(2);
});

test("usersCount should be 2", () => {
	const action = setUsersCount(2);

	const newState = usersReducer(state, action);

	expect(newState.usersCount).toBe(2);
});