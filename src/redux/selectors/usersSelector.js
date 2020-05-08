import { createSelector } from "reselect";

const getUsersData = (state) => {
	return state.usersData.users
}

const getPage = (state) => {
	return state.usersData.page
}

const getPageCount = (state) => {
	return state.usersData.count
}

const getUsersCount = (state) => {
	return state.usersData.usersCount
}

const getIsFetching = (state) => {
	return state.usersData.isFetching
}

const getIsFollowing = (state) => {
	return state.usersData.isFollowing
}

export { getUsersData, getPage, getPageCount, getUsersCount, getIsFetching, getIsFollowing }