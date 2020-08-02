import { usersAPI } from '../api/api'
import { arrayMapHelper } from '../utils/arrayMapHelper'

const FOLLOW = 'usersReducer/FOLLOW'
const UNFOLLOW = 'usersReducer/UNFOLLOW'
const SET_USERS = 'usersReducer/SET_USERS'
const SET_PAGE = 'usersReducer/SET_PAGE'
const SET_COUNT = 'usersReducer/SET_COUNT'
const SET_ERROR = 'usersReducer/SET_ERROR'
const SET_USERS_COUNT = 'usersReducer/SET_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'usersReducer/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'usersReducer/TOGGLE_IS_FOLLOWING'

const initial = {
  users: [],
  page: 1,
  count: 4,
  usersCount: 0,
  isFetching: false,
  isFollowing: [],
  error: false,
}

const usersReducer = (state = initial, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: arrayMapHelper(state.users, action.payload, 'id', {
          followed: true,
        }),
      }
    case UNFOLLOW:
      return {
        ...state,
        users: arrayMapHelper(state.users, action.payload, 'id', {
          followed: false,
        }),
      }
    case SET_USERS:
      return {
        ...state,
        users: [...action.payload],
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: true,
      }
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      }
    case SET_USERS_COUNT:
      return {
        ...state,
        usersCount: action.payload,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      }
    case TOGGLE_IS_FOLLOWING:
      return {
        ...state,
        isFollowing: action.payload
          ? [...state.isFollowing, action.id]
          : state.isFollowing.filter(id => id !== action.id),
      }
    default:
      return state
  }
}

const acceptFollow = payload => ({ type: FOLLOW, payload })
const acceptUnFollow = payload => ({ type: UNFOLLOW, payload })
const setUsers = payload => ({ type: SET_USERS, payload })
const setPage = payload => ({ type: SET_PAGE, payload })
const setError = () => ({ type: SET_ERROR })
const acceptSetCount = payload => ({ type: SET_COUNT, payload })
const setUsersCount = payload => ({ type: SET_USERS_COUNT, payload })
const toggleIsFetching = payload => ({ type: TOGGLE_IS_FETCHING, payload })
const toggleIsFollowing = (payload, id) => ({ type: TOGGLE_IS_FOLLOWING, payload, id })

const setCount = count => async dispatch => {
  dispatch(acceptSetCount(count))
  dispatch(getUsers(1, count))
}

const getUsers = (page, count) => async dispatch => {
  dispatch(setPage(page))
  dispatch(toggleIsFetching(true))
  const data = await usersAPI.getUsers(page, count)

  dispatch(toggleIsFetching(false))
  if (!data) return dispatch(setError())

  dispatch(setUsers(data.items))
  dispatch(setUsersCount(data.totalCount))
}

const followUnfollowFlow = async (dispatch, method, action, id) => {
  dispatch(toggleIsFollowing(true, id))
  const data = (await method(id)) || {}

  if (data.resultCode === 0) dispatch(action(id))
  dispatch(toggleIsFollowing(false, id))
}

const follow = id => async dispatch => {
  followUnfollowFlow(dispatch, usersAPI.followAjax, acceptFollow, id)
}

const unFollow = id => async dispatch => {
  followUnfollowFlow(dispatch, usersAPI.unFollowAjax, acceptUnFollow, id)
}

export default usersReducer
export { follow, unFollow, getUsers }
export { acceptFollow, acceptUnFollow, setUsers, setPage, setCount, setUsersCount, acceptSetCount }
