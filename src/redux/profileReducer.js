import { profileAPI } from '../api/api'
import { errorHandler } from '../utils/errorHandlers'

const ADD_POST = 'profileReducer/ADD_POST'
const REMOVE_POST = 'profileReducer/REMOVE_POST'
const SET_PROFILE_USER = 'profileReducer/SET_PROFILE_USER'
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
            message: action.message,
            likesCount: 0,
          },
        ],
      }
    case REMOVE_POST:
      return {
        ...state,
        postsData: state.postsData.filter((post) => post.id !== action.id),
      }
    case SET_PROFILE_USER:
      return { ...state, profile: action.profile }
    case SET_USER_STATUS:
      return { ...state, status: action.status }
    case SET_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    default:
      return state
  }
}

const addPost = (message) => ({ type: ADD_POST, message })
const removePost = (id) => ({ type: REMOVE_POST, id })
const setProfileUser = (profile) => ({ type: SET_PROFILE_USER, profile })
const setUserStatus = (status) => ({ type: SET_USER_STATUS, status })
const setPhotoSuccess = (photos) => ({ type: SET_PHOTO_SUCCESS, photos })
const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})

const setProfile = (userId) => async (dispatch) => {
  dispatch(toggleIsFetching(true))
  try {
    const data = await profileAPI.getProfile(userId)
    dispatch(setProfileUser(data))
  } catch (err) {
    errorHandler(err)
  } finally {
    dispatch(toggleIsFetching(false))
  }
}

const getUserStatus = (userId) => async (dispatch) => {
  const data = await profileAPI.getUserStatus(userId)
  dispatch(setUserStatus(data))
}

const updateUserStatus = (status) => async (dispatch) => {
  try {
    const data = await profileAPI.setUserStatus(status)
    if (data.resultCode === 0) {
      dispatch(setUserStatus(status))
    }
  } catch (err) {
    errorHandler(err)
  }
}

const setPhoto = (photo) => async (dispatch) => {
  try {
    const response = await profileAPI.setPhoto(photo)
    if (response.resultCode === 0) {
      dispatch(setPhotoSuccess(response.data.photos))
    }
  } catch (err) {
    errorHandler(err)
  }
}

const setProfileData = (formData) => async (dispatch) => {
  try {
    const response = await profileAPI.setProfileData(formData)
    if (response.resultCode === 0) {
      dispatch(setProfile(formData.userId))
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
}
