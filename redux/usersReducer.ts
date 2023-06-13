import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { usersAPI } from '../api/api'

export type User = {
  id: number
  name: string
  photos: {
    small: string
    large: string
  }
  status: string
  uniqueUrlName: string
  followed: boolean
}

export type UsersState = {
  users: User[];
  page: number;
  count: number;
  usersCount: number;
  isFetching: boolean;
  isFollowing: number[];
  error: boolean;
};

const initialState: UsersState = {
  users: [],
  page: 1,
  count: 4,
  usersCount: 0,
  isFetching: false,
  isFollowing: [],
  error: false,
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (args: { page: number; count: number }) => {
    const { page, count } = args;
    const response = await usersAPI.getUsers(page, count);
    return response;
  }
);

export const follow = createAsyncThunk('users/follow', async (id: number) => {
  const response = await usersAPI.followAjax(id);
  return { id, response };
});

export const unFollow = createAsyncThunk('users/unFollow', async (id: number) => {
  const response = await usersAPI.unFollowAjax(id);
  return { id, response };
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.items;
        state.usersCount = action.payload.totalCount;
        state.isFetching = false;
        state.error = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(follow.fulfilled, (state, action) => {
        const user = state.users.find((user) => user.id === action.payload.id);
        if (user) {
          user.followed = true;
        }
      })
      .addCase(unFollow.fulfilled, (state, action) => {
        const user = state.users.find((user) => user.id === action.payload.id);
        if (user) {
          user.followed = false;
        }
      });
  },
});

export const { setPage, setCount } = usersSlice.actions;

export default usersSlice.reducer;

