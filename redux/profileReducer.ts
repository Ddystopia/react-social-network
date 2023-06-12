import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { profileAPI } from '@/api/api';


export type ProfileState = {
  postsData: Post[];
  profiles: { [key: number]: Profile }
  isFetching: boolean;
  status: string;
  authUserId: number | null;
}

export type Post = {
  id: number;
  message: string;
  likesCount: number;
}

export type Profile = {
  aboutMe: string;
  contacts: Contacts;
  photos: {
    small?: string;
    large?: string;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
};

export type Contacts = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
};

const initialState: ProfileState = {
  postsData: [
    {
      id: 1,
      message: 'My first Post!',
      likesCount: 0,
    }, {
      id: 2,
      message: 'I like dogs',
      likesCount: 2,
    }, {
      id: 3,
      message: 'Yesterday I ate delicious pasta',
      likesCount: 0,
    }, {
      id: 4,
      message: 'My best day',
      likesCount: 0,
    },
  ],
  profiles: [],
  authUserId: null,
  isFetching: false,
  status: '',
};

export const syncProfile = createAsyncThunk<Profile | null, { userId: number }>(
  'profile/syncProfile',
  async ({ userId }) => {
    const response = await profileAPI.getProfile(userId);
    const profile = response || null;

    return profile;
  }
);

export const syncUserStatus = createAsyncThunk<string, { userId: number }>(
  'profile/getUserStatus',
  async ({ userId }) => {
    const data = await profileAPI.getUserStatus(userId);
    return data || '';
  }
);

export const updateUserStatus = createAsyncThunk<string, { status: string }>(
  'profile/updateUserStatus',
  async ({ status }) => {
    const data = await profileAPI.setUserStatus(status);
    if (data?.resultCode === 0) {
      return status;
    }
    return ""
  }
);

export const setPhoto = createAsyncThunk<{ small?: string; large?: string; }, { photo: File }>(
  'profile/setPhoto',
  async ({ photo }) => {
    const response = await profileAPI.setPhoto(photo);

    if (response?.resultCode !== 0) {
      return {}
    }

    return response.data.photos;
  }
);

export const updateProfileData = createAsyncThunk<Profile, { formData: Profile }>(
  'profile/unpdateProfileData',
  async ({ formData }, { rejectWithValue, dispatch }) => {
    const response = await profileAPI.setProfileData(formData);
    if (response?.resultCode !== 0) {
      return rejectWithValue(response);
    }
    dispatch(syncProfile({ userId: formData.userId }));
    return formData;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<string>) => {
      state.postsData.push({
        id: state.postsData.length + 1,
        message: action.payload,
        likesCount: 0,
      });
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.postsData = state.postsData
        .filter(post => post.id !== action.payload);
    },
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles[action.payload.userId] = action.payload;
    },
    setUserStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setPhotoSuccess: (state, action: PayloadAction<{ small?: string; large?: string; }>) => {
      const id = state.authUserId;
      if (id) {
        state.profiles[id].photos = action.payload;
      }
    },
    toggleIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(syncProfile.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(syncProfile.fulfilled, (state, action) => {
        const id = action.payload?.userId;
        if (action.payload && id) {
          state.profiles[id] = action.payload;
        }
        state.isFetching = false;
      })
      .addCase(syncProfile.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(syncUserStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(setPhoto.fulfilled, (state, action) => {
        const id = state.authUserId;
        if (id) {
          state.profiles[id].photos = action.payload;
        }
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        const id = action.payload.userId;
        state.profiles[id] = action.payload;
      })
  },
});

export default profileSlice.reducer;

export const {
  addPost,
  removePost,
  setProfile,
  setUserStatus,
  setPhotoSuccess,
  toggleIsFetching
} = profileSlice.actions;

