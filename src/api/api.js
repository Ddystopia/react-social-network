import { create as createAxiosInstance } from 'axios'
import NewsAPI from 'newsapi'
import { errorHandler } from '../utils/errorHandlers'
const newsapi = new NewsAPI('8cd00d3cacde4da2a2dcb5895d6fea47')

const instance = {
  axiosInstance: createAxiosInstance({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { 'API-KEY': 'a87d05fc-fb38-4038-beb2-94a7f0e49597' },
    withCredentials: true,
  }),
  fetch(urlPiesQuery, method, data) {
    return this.axiosInstance[method](urlPiesQuery, data)
      .then(r => r.data)
      .catch(errorHandler)
  },
  get(urlPiesQuery) {
    return this.fetch(urlPiesQuery, 'get')
  },
  post(urlPiesQuery, data) {
    return this.fetch(urlPiesQuery, 'post', data)
  },
  put(urlPiesQuery, data) {
    return this.fetch(urlPiesQuery, 'put', data)
  },
  delete(urlPiesQuery) {
    return this.fetch(urlPiesQuery, 'delete')
  },
}

const usersAPI = {
  getUsers(page, count) {
    return instance.get(`users?page=${page}&count=${count}`)
  },

  followAjax(id) {
    return instance.post(`follow/${id}`, {})
  },

  unFollowAjax(id) {
    return instance.delete(`follow/${id}`)
  },
}

const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}`)
  },
  getUserStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  async setUserStatus(status) {
    return instance.put('profile/status/', { status })
  },
  async setProfileData(formData) {
    return instance.put('profile/', formData)
  },
  async setPhoto(photo) {
    const formData = new FormData()
    formData.append('image', photo)
    return instance.axiosInstance
      .put('profile/photo/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(r => r.data)
  },
}

const authAPI = {
  me() {
    return instance.get('auth/me')
  },
  login(formData) {
    return instance.post('auth/login', { ...formData })
  },
  logout() {
    return instance.delete('auth/login')
  },
}

const dialogsAPI = {
  getAllDialogs() {
    return instance.get('dialogs')
  },
  createNewChat(userId) {
    return instance.put(`dialogs/${userId}`)
  },
  getMessages(userId) {
    return instance.get(`dialogs/${userId}/messages`)
  },
  getNewMessages(userId, lastCheck) {
    return instance.get(
      `dialogs/${userId}/messages/new?newerThen=${lastCheck.toJSON().replace(/z[\d.]*$/i, '')}`
    )
  },
  getNewMessagesCount() {
    return instance.get(`dialogs/messages/new/count`)
  },
  sendMessage(userId, body) {
    return instance.post(`dialogs/${userId}/messages`, { body })
  },
  isViewed(messageId) {
    return instance.get(`dialogs/messages/${messageId}/viewed`)
  },
  toSpam(messageId) {
    return instance.post(`dialogs/messages/${messageId}/spam`)
  },
  deleteSelf(messageId) {
    return instance.delete(`dialogs/messages/${messageId}`)
  },
  restoreMessage(messageId) {
    return instance.put(`dialogs/messages/${messageId}/restore`)
  },
}

const securityAPI = {
  getCaptchaUrl() {
    return instance.get('security/get-captcha-url')
  },
}

const newsAPI = {
  getArticles(page, count) {
    return newsapi.v2
      .everything({
        language: 'en',
        q: '(front-end OR frontend) +programming -peacock',
        page,
        count,
      })
      .then(r => r.articles)
  },
}

export { usersAPI, authAPI, profileAPI, securityAPI, dialogsAPI, newsAPI }
