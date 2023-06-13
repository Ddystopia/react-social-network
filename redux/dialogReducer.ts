import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dialogsAPI } from '../api/api';
import { AppState } from './store';

export type MessageData = {
  id: string;
  body: string;
  addedAt: Date;
  senderId: number;
  senderName: string;
  recipientId: number;
  recipientName: string;
  viewed: boolean;
  deletedBySender: boolean;
  deletedByRecipient: boolean;

  isSpam: boolean
  distributionId: number | null,
  translatedBody: boolean | null,
}

export type ChatData = {
  id: number
  userName: string
  newMessagesCount: number

  photos: Array<{
    small?: string
    large?: string
  }>
  hasNewMessages: boolean,
  lastDialogActivityDate: Date
  lastUserActivityDate: Date
}

type DialogState = {
  chatsData: ChatData[]
  messagesData: MessageData[]
  newMessagesCount: number
  currentDialogId: number | null
  messagesFetching: boolean
  lastCheck: string
}

const initialState: DialogState = {
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
  lastCheck: new Date().toString(),
};


export const getAllDialogs = createAsyncThunk<ChatData[], void>(
  'dialog/getAllDialogs',
  async () => {
    const dialogs = await dialogsAPI.getAllDialogs();
    return dialogs || [];
  }
);

export const initalizeDialogs = createAsyncThunk<void, void, { state: AppState }>(
  'dialog/initalizeDialogs',
  async (_, { dispatch, getState }) => {
    await dispatch(getAllDialogs());
    const firstElemId = getState().dialogData.chatsData[0]?.id;

    if (firstElemId) {
      await dispatch(getMessages(firstElemId))
      dispatch(setCurrentDialogId(firstElemId))
    }
  }
);


export const createNewChat = createAsyncThunk<void, number>(
  'dialog/createNewChat',
  async (userId, { dispatch }) => {
    const response = await dialogsAPI.createNewChat(userId);
    if (response?.resultCode === 0) {
      dispatch(getAllDialogs());
    }
  }
);

export const getMessages = createAsyncThunk<MessageData[], number, { rejectValue: { errorMessage: string } }>(
  'dialog/getMessages',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await dialogsAPI.getMessages(userId);
      return response.items;
    } catch (err) {
      const errorMessage = "Failed to fetch messages";
      return rejectWithValue({ errorMessage });
    }
  }
);

export const __getNewMessages = createAsyncThunk<MessageData[], { userId: number, lastCheck: Date }>(
  'dialog/getNewMessages',
  async ({ userId, lastCheck }, { dispatch }) => {
    if (!userId) return;
    dispatch(setLastCheck(new Date()));
    dispatch(setNewMessagesCountInChat({ id: userId, newMessagesCount: 0 }));
    const response = await dialogsAPI.getNewMessages(userId, lastCheck);
    return response || [];
  }
);

export const getNewMessages = createAsyncThunk<
  MessageData[],
  { userId: number, lastCheck: Date },
  { rejectValue: { errorMessage: string } }
>(
  'dialog/getNewMessages',
  async ({ userId, lastCheck }, { rejectWithValue }) => {
    try {
      const response = await dialogsAPI.getNewMessages(userId, lastCheck);
      return response || [];
    } catch (err) {
      const errorMessage = "Failed to fetch messages";
      return rejectWithValue({ errorMessage });
    }
  }
);

export const getNewMessagesCount = createAsyncThunk<number, void>(
  'dialog/getNewMessagesCount',
  async () => {
    const count = await dialogsAPI.getNewMessagesCount();
    return count || 0;
  }
);

export const sendMessage = createAsyncThunk<void, { userId: number, message: string }>(
  'dialog/sendMessage',
  async ({ userId, message }, { dispatch }) => {
    const response = await dialogsAPI.sendMessage(userId, message);
    if (response?.resultCode === 0) {
      dispatch(addMessage(response.data.message));
    }
  }
);

export const checkIsViewed = createAsyncThunk<void, string>(
  'dialog/checkIsViewed',
  async (messageId, /*{ dispatch }*/) => {
    const response = await dialogsAPI.isViewed(messageId);
    if (response?.resultCode === 0) {
      /*Some do*/
    }
  }
);

export const removeMessage = createAsyncThunk<void, MessageData>(
  'dialog/removeMessage',
  async (message, { dispatch }) => {
    const response = await dialogsAPI.deleteSelf(message.id);
    if (response?.resultCode === 0) {
      dispatch(editMessage({ id: message.id, newMessage: { ...message, deletedBySender: true } }));
    }
  }
);

export const restoreMessage = createAsyncThunk<void, MessageData>(
  'dialog/restoreMessage',
  async (message, { dispatch }) => {
    const response = await dialogsAPI.restoreMessage(message.id);
    if (response?.resultCode === 0) {
      dispatch(editMessage({ id: message.id, newMessage: { ...message, deletedBySender: false } }));
    }
  }
);

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    addMessage: (state, action: { payload: MessageData }) => {
      state.messagesData.push(action.payload);
    },
    editMessage: (state, action: { payload: { id: string, newMessage: MessageData } }) => {
      const message = state.messagesData.find((m) => m.id === action.payload.id);
      if (message) {
        Object.assign(message, action.payload.newMessage);
      }
    },
    setCurrentDialogId: (state, action: { payload: number }) => {
      state.currentDialogId = action.payload;
    },
    setLastCheck: (state, action: { payload: Date }) => {
      state.lastCheck = action.payload.toString();
    },
    setNewMessagesCountInChat: (state, action: { payload: { id: number, newMessagesCount: number } }) => {
      const chat = state.chatsData.find((c) => c.id === action.payload.id);
      if (chat) {
        chat.newMessagesCount = action.payload.newMessagesCount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDialogs.fulfilled, (state, action) => {
        state.chatsData = action.payload;
      })
      .addCase(getNewMessagesCount.fulfilled, (state, action) => {
        state.newMessagesCount = action.payload;
      })
      .addCase(getMessages.pending, (state) => {
        state.messagesFetching = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messagesData = action.payload;
        state.messagesFetching = false;
        state.currentDialogId = action.meta.arg;
        state.chatsData
          .filter(chat => chat.id === action.meta.arg)
          .forEach(chat => chat.newMessagesCount = 0);
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.messagesFetching = false;
        if (action.payload) {
          // state.error = action.payload.errorMessage;
        } else {
          // state.error = action.error.message;
        }
      })
      .addCase(getNewMessages.fulfilled, (state, action) => {
        if (action.meta.arg.userId) {
          state.lastCheck = new Date().toString();
          state.chatsData
            .filter(chat => chat.id === action.meta.arg.userId)
            .forEach(chat => chat.newMessagesCount = 0);
        }
        state.messagesData = [...state.messagesData, ...action.payload];
      })
      .addCase(getNewMessages.rejected, (_, action) => {
        if (action.payload) {
          // state.error = action.payload.errorMessage;
        } else {
          // state.error = action.error.message;
        }
      });
  },
});

export const {
  addMessage,
  editMessage,
  setCurrentDialogId,
  setLastCheck,
  setNewMessagesCountInChat,
} = dialogSlice.actions;

export default dialogSlice.reducer;

