import * as axios from "axios";

const instance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.0/",
	headers: { "API-KEY": "6bd488a7-8102-4f56-8668-0ba795d69754" },
	withCredentials: true,
});

const usersAPI = {
	getUsers(page, count) {
		return instance
			.get(`users?page=${page}&count=${count}`)
			.then((r) => r.data);
	},

	followAjax(id) {
		return instance.post(`follow/${id}`, {}).then((r) => r.data);
	},

	unFollowAjax(id) {
		return instance.delete(`follow/${id}`).then((r) => r.data);
	},
};

const getProfile = (id) => {
	return instance.get(`profile/${id}`).then((r) => r.data);
};

const authMe = () => {
	return instance.get(`auth/me`).then((r) => r.data);
};

export { usersAPI, authMe, getProfile };
