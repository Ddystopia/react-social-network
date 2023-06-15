import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authUser } from './authReducer';
import { syncProfile, syncUserStatus } from './profileReducer';
import { errorHandler } from '../utils/errorHandlers';
import { AppState as RootState } from './store';

interface AppState {
  initialized: boolean;
}

const initialState: AppState = {
  initialized: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
});

export const { setInitialized } = appSlice.actions;

export const initializeApp = createAsyncThunk<void, void, { state: RootState }>(
  'app/initialize',
  async (_, { dispatch, getState }) => {
    try {
      if (getState().app.initialized) {
        return;
      }

      const authAction = await dispatch(authUser());
      const userId = authAction.payload as number;
      if (userId) {
        await Promise.all([
          dispatch(syncProfile({ userId })),
          dispatch(syncUserStatus({ userId })),
        ]);
        dispatch(setInitialized(true));
      } else {
        dispatch(setInitialized(false));
      }
    } catch (err) {
      if (err instanceof Error) {
        errorHandler(err, 'Error to initialize app');
      }
    } finally {
    }
  }
);

export default appSlice.reducer;
