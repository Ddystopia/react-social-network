import { createSelector } from 'reselect'

const getUsersData = (state) => state.usersData.users

const getUsersPage = (state) => state.usersData.page

const getUsersPageCount = (state) => state.usersData.count

const getUsersCount = (state) => state.usersData.usersCount

const getIsFetchingUserData = (state) => state.usersData.isFetching

const getIsFollowing = (state) => state.usersData.isFollowing

const getIsAuth = (state) => state.auth.isAuth

const getLogin = (state) => state.auth.login

const getCaptchaUrlSelector = (state) => state.auth.captchaUrl

const getIsFetchingAuth = (state) => state.auth.isFetching

const getAuthUserId = (state) => state.auth.userId

const getChatsData = (state) => state.dialogData.chatsData

const getMessagesData = (state) => state.dialogData.messagesData

const getProfile = (state) => state.profileData.profile

const getAuthProfile = (state) => state.profileData.authProfile

const getStatus = (state) => state.profileData.status

const getPosts = (state) => state.profileData.postsData

const getIsFetchingProfile = (state) => state.profileData.isFetching

const getIsFetchingMessages = (state) => state.dialogData.messagesFetching

const getCurrentDialogId = (state) => state.dialogData.currentDialogId

const getLastCheck = (state) => state.dialogData.lastCheck

const getNewMessagesCountSelector = (state) => state.dialogData.newMessagesCount

const getNewsData = (state) => state.newsData.articles

const getNewsIsFetching = (state) => state.newsData.isFetching

const getNewsPage = (state) => state.newsData.page

const getNewsPageCount = (state) => state.newsData.count

const getDialogFriendProfile = createSelector(
  getChatsData,
  getCurrentDialogId,
  (chatsData, currentDialogIed) => {
    return chatsData.find((profile) => profile.id === currentDialogIed)
  }
)

export {
  getUsersData,
  getUsersPage,
  getUsersPageCount,
  getUsersCount,
  getIsFetchingUserData,
  getIsFollowing,
  getChatsData,
  getLastCheck,
  getMessagesData,
  getNewMessagesCountSelector,
  getCurrentDialogId,
  getAuthUserId,
  getIsAuth,
  getLogin,
  getCaptchaUrlSelector,
  getIsFetchingAuth,
  getProfile,
  getAuthProfile,
  getStatus,
  getPosts,
  getIsFetchingMessages,
  getIsFetchingProfile,
  getNewsData,
  getNewsIsFetching,
  getNewsPage,
  getNewsPageCount,
  getDialogFriendProfile,
}
