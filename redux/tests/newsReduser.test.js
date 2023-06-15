import newsReducer, {
  addArticles,
  setPage,
  acceptSetCount,
  toggleIsFetching,
} from '../newsReducer';

const state = {
  articles: [],
  page: 1,
  count: 20,
  isFetching: false,
};

test('articles should adds correctly', () => {
  const action = addArticles([{}, {}]);

  const newState = newsReducer(state, action);
  expect(newState.articles.length).toBe(2);

  const action2 = addArticles([{}, {}, {}]);

  const newState2 = newsReducer(newState, action2);
  expect(newState2.articles.length).toBe(5);
});

test('page should sets correctly', () => {
  const action = setPage(3);

  const newState = newsReducer(state, action);
  expect(newState.page).toBe(3);
});

test('count should sets correctly', () => {
  const action = acceptSetCount(30);

  const newState = newsReducer(state, action);
  expect(newState.count).toBe(30);
});

test('is should be true', () => {
  const action = toggleIsFetching(true);

  const newState = newsReducer(state, action);
  expect(newState.isFetching).toBe(true);
});

test('is should be false', () => {
  const action = toggleIsFetching(false);

  const newState = newsReducer(state, action);
  expect(newState.isFetching).toBe(false);
});
