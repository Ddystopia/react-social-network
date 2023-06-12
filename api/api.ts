import axios from 'axios'
import NewsAPI from 'newsapi'
import { errorHandler } from '@/utils/errorHandlers'
import { Profile } from '@/redux/profileReducer'
import { Article } from '@/redux/newsReducer'
const newsapi = new NewsAPI('8cd00d3cacde4da2a2dcb5895d6fea47')

const instance = {
  axiosInstance: axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { 'API-KEY': 'a87d05fc-fb38-4038-beb2-94a7f0e49597' },
    withCredentials: true,
  }),
  async get(urlPiesQuery: string) {
    let res = await this.axiosInstance.get(urlPiesQuery).catch(errorHandler);
    return res?.data;
  },
  async post(urlPiesQuery: string, data?: object) {
    let res = await this.axiosInstance.post(urlPiesQuery, data).catch(errorHandler)
    return res?.data;
  },
  async put(urlPiesQuery: string, data?: object) {
    let res = await this.axiosInstance.put(urlPiesQuery, data).catch(errorHandler)
    return res?.data;
  },
  async delete(urlPiesQuery: string) {
    let res = await this.axiosInstance.delete(urlPiesQuery).catch(errorHandler)
    return res?.data;
  },
}

const usersAPI = {
  getUsers(page: number, count: number) {
    return instance.get(`users?page=${page}&count=${count}`)
  },

  followAjax(id: number) {
    return instance.post(`follow/${id}`, {})
  },

  unFollowAjax(id: number) {
    return instance.delete(`follow/${id}`)
  },
}

const profileAPI = {
  getProfile(id: number) {
    return instance.get(`profile/${id}`)
  },
  getUserStatus(userId: number) {
    return instance.get(`profile/status/${userId}`)
  },
  async setUserStatus(status: string) {
    return instance.put('profile/status/', { status })
  },
  async setProfileData(profile: Profile) {
    return instance.put('profile/', profile)
  },
  async setPhoto(photo: File) {
    const formData = new FormData()
    formData.append('image', photo)
    return instance.axiosInstance
      .put('profile/photo/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(r => r.data)
  },
}

export type LoginValues = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

type AuthBaseResponse<T> = {
  data: T,
  messages: Array<string>,
  resultCode: number
}
const authAPI = {
  async me(): Promise<AuthBaseResponse<{ id: number, email: string, login: string }>> {
    return instance.get('auth/me')
  },
  async login(loginValues: LoginValues): Promise<AuthBaseResponse<{ userId: number }>> {
    return instance.post('auth/login', { ...loginValues })
  },
  async logout(): Promise<AuthBaseResponse<{}>> {
    return instance.delete('auth/login')
  },
}

const dialogsAPI = {
  getAllDialogs() {
    return instance.get('dialogs')
  },
  createNewChat(userId: number) {
    return instance.put(`dialogs/${userId}`)
  },
  getMessages(userId: number) {
    return instance.get(`dialogs/${userId}/messages`)
  },
  getNewMessages(userId: number, lastCheck: Date) {
    return instance.get(
      `dialogs/${userId}/messages/new?newerThen=${lastCheck.toJSON().replace(/z[\d.]*$/i, '')}`
    )
  },
  getNewMessagesCount() {
    return instance.get(`dialogs/messages/new/count`)
  },
  sendMessage(userId: number, body: string) {
    return instance.post(`dialogs/${userId}/messages`, { body })
  },
  isViewed(messageId: string) {
    return instance.get(`dialogs/messages/${messageId}/viewed`)
  },
  toSpam(messageId: string) {
    return instance.post(`dialogs/messages/${messageId}/spam`)
  },
  deleteSelf(messageId: string) {
    return instance.delete(`dialogs/messages/${messageId}`)
  },
  restoreMessage(messageId: string) {
    return instance.put(`dialogs/messages/${messageId}/restore`)
  },
}

const securityAPI = {
  getCaptchaUrl() {
    return instance.get('security/get-captcha-url')
  },
}

const newsAPI = {
  async getArticles(page: number, count: number): Promise<Article[]> {
    type NewsAPIResponse = {
      status: string,
      totalResults: number,
      articles: Article[]
    };
    return newsapi.v2
      .everything({
        language: 'en',
        q: '(front-end OR frontend) +programming -peacock',
        page,
        count,
      })
      .then((r: NewsAPIResponse) => r.articles || [])
  },
}

export { usersAPI, authAPI, profileAPI, securityAPI, dialogsAPI, newsAPI }
