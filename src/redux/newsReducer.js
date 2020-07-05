import { newsAPI } from '../api/api'
import { errorHandler } from '../utils/errorHandlers'

const ADD_ARTICLES = 'newsReducer/ADD_ARTICLES'
const SET_PAGE = 'newsReducer/SET_PAGE'
const SET_COUNT = 'newsReducer/SET_COUNT'
const TOGGLE_IS_FETCHING = 'newsReducer/TOGGLE_IS_FETCHING'

const initial = {
  articles: [],
  page: 1,
  count: 20,
  isFetching: false,
}

const newsReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, ...action.articles],
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      }
    case SET_COUNT:
      return {
        ...state,
        count: action.count,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    default:
      return state
  }
}

const addArticles = (articles) => ({ type: ADD_ARTICLES, articles })
const setPage = (page) => ({ type: SET_PAGE, page })
const acceptSetCount = (count) => ({ type: SET_COUNT, count })
const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})

const setCount = (count) => async (dispatch) => {
  dispatch(acceptSetCount(count))
  dispatch(getArticles(1, count))
}

const getArticles = (page, count) => async (dispatch) => {
  try {
    dispatch(toggleIsFetching(true))
    const data = await newsAPI.getArticles(page, count)

    dispatch(addArticles(data))
  } catch (err) {
    errorHandler(err)
  } finally {
    dispatch(toggleIsFetching(false))
  }
}

export default newsReducer
export { getArticles, setPage, setCount }
