import { createSelector } from 'reselect'

export const getInitialized = state => state.app.initialized

export const getUsersData = state => state.usersData.users

export const getUsersPage = state => state.usersData.page

export const getUsersPageCount = state => state.usersData.count

export const getUsersCount = state => state.usersData.usersCount

export const getUsersError = state => state.usersData.error

export const getIsFetchingUserData = state => state.usersData.isFetching

export const getIsFollowing = state => state.usersData.isFollowing

export const getIsAuth = state => state.auth.isAuth

export const getLogin = state => state.auth.login

export const getCaptchaUrlSelector = state => state.auth.captchaUrl

export const getIsFetchingAuth = state => state.auth.isFetching

export const getAuthUserId = state => state.auth.userId

export const getChatsData = state => state.dialogData.chatsData

export const getMessagesData = state => state.dialogData.messagesData

export const getProfile = state => state.profileData.profile

export const getAuthProfile = state => state.profileData.authProfile

export const getStatus = state => state.profileData.status

export const getPosts = state => state.profileData.postsData

export const getIsFetchingProfile = state => state.profileData.isFetching

export const getIsFetchingMessages = state => state.dialogData.messagesFetching

export const getCurrentDialogId = state => state.dialogData.currentDialogId

export const getLastCheck = state => state.dialogData.lastCheck

export const getNewMessagesCountSelector = state => state.dialogData.newMessagesCount

export const getNewsData = state => state.newsData.articles

export const getNewsIsFetching = state => state.newsData.isFetching

export const getNewsPage = state => state.newsData.page

export const getNewsPageCount = state => state.newsData.count

export const getDialogFriendProfile = createSelector(
  getChatsData,
  getCurrentDialogId,
  (chatsData, currentDialogIed) => {
    return chatsData.find(profile => profile.id === currentDialogIed)
  }
)
