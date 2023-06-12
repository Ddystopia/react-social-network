import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { newsAPI } from '../api/api';
import { errorHandler } from '../utils/errorHandlers';

export type Article = {
  content: string
  url: string
  description: string
  title: string
  urlToImage: string
  author: string
  publishedAt: string
}

type NewsState = {
  articles: Article[];
  page: number;
  count: number;
  isFetching: boolean;
}

const initialState: NewsState = {
  articles: [],
  page: 1,
  count: 20,
  isFetching: false,
}

export const getArticles = createAsyncThunk<
  Article[],
  { page: number, count: number },
  { rejectValue: { errorMessage: string } }
>('news/getArticles', async ({ page, count }, { rejectWithValue }) => {
  try {
    const response = await newsAPI.getArticles(page, count);
    return response || [];
  } catch (err) {
    const errorMessage = "Failed to fetch articles";
    return rejectWithValue({ errorMessage });
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = [...state.articles, ...action.payload];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    toggleIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.articles = [...state.articles, ...action.payload];
        state.isFetching = false;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isFetching = false;
        errorHandler(action.error.message);
      });
  },
});

export const { addArticles, setPage, setCount, toggleIsFetching } = newsSlice.actions;

export default newsSlice.reducer;

