import { dialogsAPI } from '../api/api'

const SEND_MESSAGE = 'dialogReducer/SEND_MESSAGE'
const EDIT_MESSAGE = 'dialogReducer/EDIT_MESSAGE'
const SET_DIALOGS = 'dialogReducer/SET_DIALOGS'
const SET_LAST_CHECK = 'dialogReducer/SET_LAST_CHECK'
const SET_CURRENT_DIALOG_id = 'dialogReducer/SET_CURRENT_DIALOG_id'
const SET_MESSAGES = 'dialogReducer/SET_MESSAGES'
const ADD_MESSAGES = 'dialogReducer/ADD_MESSAGES'
const TOGGLE_IS_FETCHING = 'dialogReducer/TOGGLE_IS_FETCHING'
const SET_NEW_MESSAGES_COUNT = 'dialogReducer/SET_NEW_MESSAGES_COUNT'
const SET_NEW_MESSAGES_COUNT_IN_CHAT = 'dialogReducer/SET_NEW_MESSAGES_COUNT_IN_CHAT'

const initial = {
  chatsData: [
    //   {
    //     userName: 'Sasha',
    //     id: 9999,
    //     hasNewMessages: false,
    //     lastDialogActivityDate: '2020-05-31T13:57:32.957',
    //     lastUserActivityDate: '2019-09-30T15:43:55.087',
    //     newMessagesCount: 0,
    //     photos: {
    //       small: null,
    //       large: null,
    //     },
    //   },
  ],
  messagesData: [
    // {
    //   addedAt: '2020-05-31T19:11:24.16',
    //   body: 'Приветики',
    //   deletedByRecipient: false,
    //   deletedBySender: false,
    //   distributionId: null,
    //   id: '00ab27ab-c7fd-4d85-a43f-05b14c02fe1a',
    //   isSpam: false,
    //   recipientId: 8513,
    //   recipientName: 'CodeBro85',
    //   senderId: 7529,
    //   senderName: 'Ddystopia',
    //   translatedBody: null,
    //   viewed: false,
    // },
  ],
  newMessagesCount: 0,
  currentDialogId: null,
  messagesFetching: false,
  lastCheck: new Date(),
}

const dialogReducer = (state = initial, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messagesData: [...state.messagesData, action.messageObj],
      }
    case EDIT_MESSAGE:
      return {
        ...state,
        messagesData: state.messagesData.map((message) =>
          message.id === action.id ? action.newMessage : message
        ),
      }
    case SET_DIALOGS:
      return {
        ...state,
        chatsData: action.chatsData,
      }
    case SET_CURRENT_DIALOG_id:
      return {
        ...state,
        currentDialogId: action.currentDialogId,
      }
    case SET_LAST_CHECK:
      return {
        ...state,
        lastCheck: action.lastCheck,
      }
    case SET_MESSAGES:
      return {
        ...state,
        messagesData: action.messagesData,
      }
    case ADD_MESSAGES:
      return {
        ...state,
        messagesData: [...state.messagesData, ...action.messagesData],
      }
    case SET_NEW_MESSAGES_COUNT:
      return {
        ...state,
        newMessagesCount: action.newMessagesCount,
      }
    case SET_NEW_MESSAGES_COUNT_IN_CHAT:
      return {
        ...state,
        chatsData: state.chatsData.map((chat) =>
          chat.id === action.id ? { ...chat, newMessagesCount: action.newMessagesCount } : chat
        ),
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        messagesFetching: action.messagesFetching,
      }
    default:
      return state
  }
}

const accessSendMessage = (messageObj) => ({ type: SEND_MESSAGE, messageObj })
const editMessageProperties = (id, newMessage) => ({ type: EDIT_MESSAGE, id, newMessage })
const setDialogs = (chatsData) => ({ type: SET_DIALOGS, chatsData })
const setCurrentDialogId = (currentDialogId) => ({ type: SET_CURRENT_DIALOG_id, currentDialogId })
const setLastCheck = (lastCheck) => ({ type: SET_LAST_CHECK, lastCheck })
const setMessages = (messagesData) => ({ type: SET_MESSAGES, messagesData })
const addMessages = (messagesData) => ({ type: ADD_MESSAGES, messagesData })
const setNewMessagesCount = (newMessagesCount) => ({
  type: SET_NEW_MESSAGES_COUNT,
  newMessagesCount,
})
const setNewMessagesCountInChat = (id, newMessagesCount) => ({
  type: SET_NEW_MESSAGES_COUNT_IN_CHAT,
  newMessagesCount,
  id,
})
const toggleIsFetching = (messagesFetching) => ({
  type: TOGGLE_IS_FETCHING,
  messagesFetching,
})

const getAllDialogs = () => async (dispatch) => {
  const dialogs = await dialogsAPI.getAllDialogs() || []
  dispatch(setDialogs(dialogs))
}

const createNewChat = (userId) => async (dispatch) => {
  const response = await dialogsAPI.createNewChat(userId) || {}
  if (response.resultCode === 0) dispatch(getAllDialogs())
}

const getMessages = (userId) => async (dispatch) => {
  if (!userId) return
  dispatch(toggleIsFetching(true))
  const response = await dialogsAPI.getMessages(userId) || []
  dispatch(setMessages(response.items))
  dispatch(toggleIsFetching(false))
  dispatch(setCurrentDialogId(userId))
  dispatch(setNewMessagesCountInChat(userId, 0))
}
const getNewMessages = (userId, lastCheck) => async (dispatch) => {
  if (!userId) return
  dispatch(setLastCheck(new Date()))
  dispatch(setNewMessagesCountInChat(userId, 0))
  const response = await dialogsAPI.getNewMessages(userId, lastCheck) || []
  dispatch(addMessages(response))
}

const getNewMessagesCount = () => async (dispatch) => {
  const count = await dialogsAPI.getNewMessagesCount() || 0
  dispatch(setNewMessagesCount(count))
}

const sendMessage = (userId, message) => async (dispatch) => {
  const response = await dialogsAPI.sendMessage(userId, message) || {}
  if (response.resultCode === 0) dispatch(accessSendMessage(response.data.message))
}

const checkIsViewed = (messageId) => async (/* dispatch */) => {
  const response = await dialogsAPI.isViewed(messageId) || {}
  if (response.resultCode === 0) {
    /*Some do*/
  }
}

const removeMessage = (message) => async (dispatch) => {
  const response = await dialogsAPI.deleteSelf(message.id) || {}
  if (response.resultCode === 0)
    dispatch(editMessageProperties(message.id, { ...message, deletedBySender: true }))
}

const restoreMessage = (message) => async (dispatch) => {
  const response = await dialogsAPI.restoreMessage(message.id) || {}
  if (response.resultCode === 0)
    dispatch(editMessageProperties(message.id, { ...message, deletedBySender: false }))
}

export default dialogReducer
export {
  getAllDialogs,
  createNewChat,
  getMessages,
  getNewMessagesCount,
  getNewMessages,
  sendMessage,
  checkIsViewed,
  removeMessage,
  restoreMessage,
  setCurrentDialogId,
}
export { accessSendMessage, setDialogs, setNewMessagesCount, setMessages, editMessageProperties }
