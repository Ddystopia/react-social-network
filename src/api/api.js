import * as axios from 'axios'
import NewsAPI from 'newsapi'
const newsapi = new NewsAPI('8cd00d3cacde4da2a2dcb5895d6fea47')

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': '6bd488a7-8102-4f56-8668-0ba795d69754' },
  withCredentials: true,
})

const usersAPI = {
  getUsers(page, count) {
    return instance.get(`users?page=${page}&count=${count}`).then((r) => r.data)
  },

  followAjax(id) {
    return instance.post(`follow/${id}`, {}).then((r) => r.data)
  },

  unFollowAjax(id) {
    return instance.delete(`follow/${id}`).then((r) => r.data)
  },
}

const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}`).then((r) => r.data)
  },
  getUserStatus(userId) {
    return instance.get(`profile/status/${userId}`).then((r) => r.data)
  },
  async setUserStatus(status) {
    return instance.put('profile/status/', { status }).then((r) => r.data)
  },
  async setProfileData(formData) {
    return instance.put('profile/', formData).then((r) => r.data)
  },
  async setPhoto(photo) {
    const formData = new FormData()
    formData.append('image', photo)
    return instance
      .put('profile/photo/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data)
  },
}

const authAPI = {
  me() {
    return instance.get('auth/me').then((r) => r.data)
  },
  login(formData) {
    return instance.post('auth/login', { ...formData }).then((r) => r.data)
  },
  logout() {
    return instance.delete('auth/login').then((r) => r.data)
  },
}

const dialogsAPI = {
  getAllDialogs() {
    return instance.get('dialogs').then((r) => r.data)
  },
  createNewChat(userId) {
    return instance.put(`dialogs/${userId}`).then((r) => r.data)
  },
  getMessages(userId) {
    return instance.get(`dialogs/${userId}/messages`).then((r) => r.data)
  },
  getNewMessages(userId, lastCheck) {
    return instance
      .get(
        `dialogs/${userId}/messages/new?newerThen=${lastCheck.toJSON().replace(/z[\d.]*$/i, '')}`
      )
      .then((r) => r.data)
  },
  getNewMessagesCount() {
    return instance.get(`dialogs/messages/new/count`).then((r) => r.data)
  },
  sendMessage(userId, body) {
    return instance.post(`dialogs/${userId}/messages`, { body }).then((r) => r.data)
  },
  isViewed(messageId) {
    return instance.get(`dialogs/messages/${messageId}/viewed`).then((r) => r.data)
  },
  toSpam(messageId) {
    return instance.post(`dialogs/messages/${messageId}/spam`).then((r) => r.data)
  },
  deleteSelf(messageId) {
    return instance.delete(`dialogs/messages/${messageId}`).then((r) => r.data)
  },
  restoreMessage(messageId) {
    return instance.put(`dialogs/messages/${messageId}/restore`).then((r) => r.data)
  },
}

const securityAPI = {
  getCaptchaUrl() {
    return instance.get('security/get-captcha-url').then((r) => r.data)
  },
}

const newsAPI = {
  getArticles(page, count) {
    return newsapi.v2
      .everything({
        language: 'en',
        q: 'front-end',
        page,
        count,
      })
      .then((r) => r.articles)
  },
}

export { usersAPI, authAPI, profileAPI, securityAPI, dialogsAPI, newsAPI }
