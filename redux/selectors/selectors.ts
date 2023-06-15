import { createSelector } from 'reselect';
import { AppState } from '@/redux/store';
import { Profile } from '../profileReducer';

export const getInitialized = (state: AppState) => state.app.initialized;

export const getUsersData = (state: AppState) => state.usersData.users;

export const getUsersPage = (state: AppState) => state.usersData.page;

export const getUsersPageCount = (state: AppState) => state.usersData.count;

export const getUsersCount = (state: AppState) => state.usersData.usersCount;

export const getUsersError = (state: AppState) => state.usersData.error;

export const getIsFetchingUserData = (state: AppState) => state.usersData.isFetching;

export const getIsFollowing = (state: AppState) => state.usersData.isFollowing;

export const getIsAuth = (state: AppState) => state.auth.isAuth;

export const getLogin = (state: AppState) => state.auth.login;

export const getCaptchaUrl = (state: AppState) => state.auth.captchaUrl;

export const getIsFetchingAuth = (state: AppState) => state.auth.isFetching;

export const getAuthUserId = (state: AppState) => state.auth.userId;

export const getChatsData = (state: AppState) => state.dialogData.chatsData;

export const getMessagesData = (state: AppState) => state.dialogData.messagesData;

export const getProfile: (id: number) => (state: AppState) => Profile | null = (id) => (state) =>
  state.profileData.profiles[id] ?? null;

export const getAuthProfile = (state: AppState) => {
  const id = getAuthUserId(state);
  if (!id) return null;
  return getProfile(id)(state);
};

export const getStatus = (state: AppState) => state.profileData.status;

export const getPosts = (state: AppState) => state.profileData.postsData;

export const getAvatarSmall = (state: AppState) => getAuthProfile(state)?.photos.small;

export const getAvatarLarge = (state: AppState) => getAuthProfile(state)?.photos.large;

export const getIsFetchingProfile = (state: AppState) => state.profileData.isFetching;

export const getIsFetchingMessages = (state: AppState) => state.dialogData.messagesFetching;

export const getCurrentDialogId = (state: AppState) => state.dialogData.currentDialogId;

export const getLastCheck = (state: AppState) => new Date(state.dialogData.lastCheck);

export const getNewMessagesCountSelector = (state: AppState) => state.dialogData.newMessagesCount;

export const getNewsData = (state: AppState) => state.newsData.articles;

export const getNewsIsFetching = (state: AppState) => state.newsData.isFetching;

export const getNewsPage = (state: AppState) => state.newsData.page;

export const getNewsPageCount = (state: AppState) => state.newsData.count;

export const getDialogFriendProfile = createSelector(
  getChatsData,
  getCurrentDialogId,
  (chatsData, currentDialogIed) => {
    const it = chatsData.find((profile) => profile.id === currentDialogIed) ?? null;
    return it as any;
  }
);
