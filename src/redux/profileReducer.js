import { profileAPI } from '../api/api'
import { errorHandler } from '../utils/errorHandlers'

const ADD_POST = 'profileReducer/ADD_POST'
const REMOVE_POST = 'profileReducer/REMOVE_POST'
const SET_PROFILE_USER = 'profileReducer/SET_PROFILE_USER'
const SET_PROFILE_AUTH = 'profileReducer/AUTH'
const TOGGLE_IS_FETCHING = 'profileReducer/TOGGLE_IS_FETCHING'
const SET_USER_STATUS = 'profileReducer/SET_USER_STATUS'
const SET_PHOTO_SUCCESS = 'profileReducer/SET_PHOTO_SUCCESS'

const initial = {
  postsData: [
    {
      id: 1,
      message: 'My first Post!',
      likesCount: 0,
    },
    {
      id: 2,
      message: 'I like dogs',
      likesCount: 0,
    },
    {
      id: 3,
      message: 'Yesterday I ate delicious pasta',
      likesCount: 0,
    },
    {
      id: 4,
      message: 'My best day',
      likesCount: 0,
    },
  ],
  profile: null,
  authProfile: null,
  isFetching: false,
  status: '',
}

const profileReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsData: [
          ...state.postsData,
          {
            id: state.postsData[state.postsData.length - 1].id + 1,
            message: action.payload,
            likesCount: 0,
          },
        ],
      }
    case REMOVE_POST:
      return {
        ...state,
        postsData: state.postsData.filter(post => post.id !== action.payload),
      }
    case SET_PROFILE_USER:
      return { ...state, profile: action.payload }
    case SET_PROFILE_AUTH:
      return { ...state, authProfile: action.payload }
    case SET_USER_STATUS:
      return { ...state, status: action.payload }
    case SET_PHOTO_SUCCESS:
      return { ...state, authProfile: { ...state.authProfile, photos: action.payload } }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      }
    default:
      return state
  }
}

const addPost = payload => ({ type: ADD_POST, payload })
const removePost = payload => ({ type: REMOVE_POST, payload })
const setProfileUser = payload => ({ type: SET_PROFILE_USER, payload })
const setProfileAuth = payload => ({ type: SET_PROFILE_AUTH, payload })
const setUserStatus = payload => ({ type: SET_USER_STATUS, payload })
const setPhotoSuccess = payload => ({ type: SET_PHOTO_SUCCESS, payload })
const toggleIsFetching = payload => ({ type: TOGGLE_IS_FETCHING, payload })

const setProfile = (userId, isAuthUser = false) => async dispatch => {
  dispatch(toggleIsFetching(true))
  try {
    const data = (await profileAPI.getProfile(userId)) || null
    if (isAuthUser) dispatch(setProfileAuth(data))
    dispatch(setProfileUser(data))
  } catch (err) {
    errorHandler(err)
  } finally {
    dispatch(toggleIsFetching(false))
  }
}

const getUserStatus = userId => async dispatch => {
  const data = (await profileAPI.getUserStatus(userId)) || ''
  dispatch(setUserStatus(data))
}

const updateUserStatus = status => async dispatch => {
  try {
    const data = (await profileAPI.setUserStatus(status)) || {}
    if (data.resultCode === 0) {
      dispatch(setUserStatus(status))
    }
  } catch (err) {
    errorHandler(err)
  }
}

const setPhoto = photo => async dispatch => {
  try {
    const response = (await profileAPI.setPhoto(photo)) || {}
    if (response.resultCode === 0) {
      dispatch(setPhotoSuccess(response.data.photos))
    }
  } catch (err) {
    errorHandler(err)
  }
}

const setProfileData = formData => async dispatch => {
  try {
    const response = (await profileAPI.setProfileData(formData)) || {}
    if (response.resultCode === 0) {
      dispatch(setProfile(formData.userId, true))
    } else return Promise.reject()
  } catch (err) {
    errorHandler(err)
  }
}

export default profileReducer
export {
  setProfile,
  getUserStatus,
  updateUserStatus,
  addPost,
  removePost,
  setProfileUser,
  setUserStatus,
  setPhoto,
  setProfileData,
  setProfileAuth,
}
