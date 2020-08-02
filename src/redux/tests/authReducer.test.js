import authReducer, { setAuthUser, toggleIsFetching ,setCaptchaUrl} from '../authReducer'

const state = {
  email: null,
  login: null,
  userId: null,
  isAuth: false,
  isFetching: false,
}
test("email login userId should be '', is auth should be true", () => {
  const action = setAuthUser('', '', '')

  const newState = authReducer(state, action)

  expect(newState.email).toBe('')
  expect(newState.login).toBe('')
  expect(newState.userId).toBe('')
  expect(newState.isAuth).toBe(true)
})

test('toggle isFetching to true', () => {
  const action = toggleIsFetching(true)

  const newState = authReducer(state, action)

  expect(newState.isFetching).toBe(true)
})

test('toggle isFetching to false', () => {
  const action = toggleIsFetching(false)

  const newState = authReducer(state, action)

  expect(newState.isFetching).toBe(false)
})
test('captchaUrl must be right', () => {
  const action = setCaptchaUrl('url')

  const newState = authReducer(state, action)

  expect(newState.captchaUrl).toBe('url')
})
