import appReducer, { setInitialize } from '../appReducer'

const state = {
  initialized: false,
}
test('initialized should be true', () => {
  const action = setInitialize(true)

  const newState = appReducer(state, action)

  expect(newState.initialized).toBe(true)
})
test('initialized should be false', () => {
  const action = setInitialize(false)

  const newState = appReducer(state, action)

  expect(newState.initialized).toBe(false)
})
