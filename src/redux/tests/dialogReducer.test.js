import dialogReducer, {
  accessSendMessage,
  accessRemoveMessage,
  setDialogs,
  setNewMessagesCount,
	setMessages,
	setCurrentDialogId
} from '../dialogReducer'

const state = {
  chatsData: [
    { userName: 'Sasha', id: 0 },
    { userName: 'Dasha', id: 1 },
    { userName: 'Viktor', id: 2 },
    { userName: 'Katya', id: 3 },
    { userName: 'Andrew', id: 4 },
    { userName: 'Liza', id: 5 },
    { userName: 'Maxim', id: 6 },
    { userName: 'Ann', id: 7 },
    { userName: 'Tom', id: 8 },
    { userName: 'Nastya', id: 9 },
  ],
  messagesData: [
    {
      self: false,
      date: new Date(2020, 3, 13, 15, 47, 18),
      message: 'Hi bro',
      id: 1,
    },
    {
      self: false,
      date: new Date(2020, 3, 13, 15, 47, 46),
      message: 'How are you bro?',
      id: 2,
    },
    {
      self: true,
      date: new Date(2020, 3, 13, 15, 48, 15),
      message: "Okay bro, I can't speak",
      id: 3,
    },
    {
      self: false,
      date: new Date(2020, 3, 13, 15, 48, 30),
      message: 'Okay, bye bro',
      id: 4,
    },
  ],
	newMessagesCount: 0,
	currentDialogId: null
}

test('length should increment', () => {
  const action = accessSendMessage('New message')

  const newState = dialogReducer(state, action)

  expect(newState.messagesData.length).toBe(5)
})

test('length should be 1', () => {
  const action = setMessages([{
    self: false,
    date: new Date(2020, 3, 13, 15, 47, 18),
    message: 'Hi bro',
    id: 1,
  }])

  const newState = dialogReducer(state, action)

  expect(newState.messagesData.length).toBe(1)
})

test('after delete length should decrement', () => {
  const action = accessRemoveMessage(2)

  const newState = dialogReducer(state, action)

  expect(newState.messagesData.length).toBe(3)
})

test('message should be correct', () => {
  const action = accessSendMessage('New message')

  const newState = dialogReducer(state, action)

  expect(newState.messagesData[4].message).toBe('New message')
})

test('dialogs length should be 1', () => {
  const action = setDialogs([{ userName: 'Dad', id: 95 }])

  const newState = dialogReducer(state, action)

  expect(newState.chatsData.length).toBe(1)
})

test('newMessagesCount should be 5', () => {
  const action = setNewMessagesCount(5)

  const newState = dialogReducer(state, action)

  expect(newState.newMessagesCount).toBe(5)
})

test('currentDialogId should be 5', () => {
  const action = setCurrentDialogId(5)

  const newState = dialogReducer(state, action)

  expect(newState.currentDialogId).toBe(5)
})
