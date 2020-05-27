const SEND_MESSAGE = 'dialogReducer/SEND_MESSAGE'
const REMOVE_MESSAGE = 'dialogReducer/REMOVE_MESSAGE'
const initial = {
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

const dialogReducer = (state = initial, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          {
            id: state.messagesData[state.messagesData.length - 1].id + 1,
            self: true,
            date: new Date(),
            message: action.message,
          },
        ],
      }
    case REMOVE_MESSAGE:
      return {
        ...state,
        messagesData: state.messagesData.filter((message) => message.id !== action.id),
      }
    default:
      return state
  }
}

const sendMessage = (message) => ({ type: SEND_MESSAGE, message })
const removeMessage = (id) => ({ type: REMOVE_MESSAGE, id })

export default dialogReducer
export { sendMessage, removeMessage }
