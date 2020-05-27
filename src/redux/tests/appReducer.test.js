import appReducer, { initializeSuccess } from '../appReducer'

const state = {
  initialized: false,
}
test('initialized should be true', () => {
  const action = initializeSuccess()

  const newState = appReducer(state, action)

  expect(newState.initialized).toBe(true)
})
