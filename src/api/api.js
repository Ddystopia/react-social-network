import * as axios from "axios";

const instance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.0/",
	headers: { "API-KEY": "6bd488a7-8102-4f56-8668-0ba795d69754_" },
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

const profileAPI = {
	getProfile(id) {
		return instance.get(`profile/${id}`).then((r) => r.data);
	},
	getUserStatus(userId) {
		return instance.get(`profile/status/${userId}`).then((r) => r.data);
	},
	async setUserStatus(status) {
		return instance.put("profile/status/", { status }).then((r) => r.data);
	},
	async setProfileData(formData) {
		return instance.put("profile/", formData).then((r) => r.data);
	},
	async setPhoto(photo) {
		const formData = new FormData();
		formData.append("image", photo);
		return instance
			.put("profile/photo/", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((r) => r.data);
	},
};

const authAPI = {
	me() {
		return instance.get("auth/me").then((r) => r.data);
	},
	login(formData) {
		return instance.post("auth/login", { ...formData }).then((r) => r.data);
	},
	logout() {
		return instance.delete("auth/login").then((r) => r.data);
	},
};

const securityAPI = {
	getCaptchaUrl() {
		return instance.get("security/get-captcha-url").then((r) => r.data);
	},
};

export { usersAPI, authAPI, profileAPI, securityAPI };
