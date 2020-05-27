import dialogReducer, { sendMessage, removeMessage } from '../dialogReducer'

const state = {
  chatsData: [
    { chatName: 'Sasha', id: 0 },
    { chatName: 'Dasha', id: 1 },
    { chatName: 'Viktor', id: 2 },
    { chatName: 'Katya', id: 3 },
    { chatName: 'Andrew', id: 4 },
    { chatName: 'Liza', id: 5 },
    { chatName: 'Maxim', id: 6 },
    { chatName: 'Ann', id: 7 },
    { chatName: 'Tom', id: 8 },
    { chatName: 'Nastya', id: 9 },
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
}

test('length should increment', () => {
  const action = sendMessage('New message')

  const newState = dialogReducer(state, action)

  expect(newState.messagesData.length).toBe(5)
})

test('after delete length should decrement', () => {
  const action = removeMessage(2)

  const newState = dialogReducer(state, action)

  expect(newState.messagesData.length).toBe(3)
})

test('message should be correct', () => {
  const action = sendMessage('New message')

  const newState = dialogReducer(state, action)

  expect(newState.messagesData[4].message).toBe('New message')
})
