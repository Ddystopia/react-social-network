import { createSelector } from 'reselect'

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
const getIsFetchingUserData = (state) => {
  return state.usersData.isFetching
}
const getIsFollowing = (state) => {
  return state.usersData.isFollowing
}
const getIsAuth = (state) => {
  return state.auth.isAuth
}
const getLogin = (state) => {
  return state.auth.login
}
const getCaptchaUrlSelector = (state) => {
  return state.auth.captchaUrl
}
const getIsFetchingAuth = (state) => {
  return state.auth.isFetching
}
const getAuthUserId = (state) => {
  return state.auth.userId
}
const getChatsData = (state) => {
  return state.dialogData.chatsData
}
const getMessagesData = (state) => {
  return state.dialogData.messagesData
}
const getProfile = (state) => {
  return state.profileData.profile
}
const getStatus = (state) => {
  return state.profileData.status
}
const getIsFetchingProfile = (state) => {
  return state.profileData.isFetching
}
const getCurrentDialogId = (state) => {
  return state.dialogData.currentDialogId
}
const getDialogFriendProfile = createSelector(
  getChatsData,
  getCurrentDialogId,
  (chatsData, currentDialogIed) => {
    return chatsData.find((profile) => profile.id === currentDialogIed)
  }
)

export {
  getUsersData,
  getPage,
  getPageCount,
  getUsersCount,
  getIsFetchingUserData,
  getIsFollowing,
  getChatsData,
  getMessagesData,
  getCurrentDialogId,
  getAuthUserId,
  getIsAuth,
  getLogin,
  getCaptchaUrlSelector,
  getIsFetchingAuth,
  getProfile,
  getStatus,
  getIsFetchingProfile,
  getDialogFriendProfile,
}
