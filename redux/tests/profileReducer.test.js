import profileReducer, {
  addPost,
  removePost,
  setProfileUser,
  setUserStatus,
} from '../profileReducer';

const state = {
  postsData: [
    {
      id: 1,
      message:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque, facere aperiam pariatur excepturi',
      likesCount: 0,
    },
    {
      id: 2,
      message:
        ' quis ex reiciendis nulla quas impedit tempore reprehenderit ad harum, explicabo itaque praesentium optio saepe. Tempora alias consequatur aliquam ad! Natus animi aliquam magni ullam tempora qui, deserunt id eos rem harum, velit sed tempore corporis aliquid eligendi saepe cum dolorem ipsa totam placeat? Voluptas distinctio ullam animi consectetur at dolore enim laborum amet, nam minima non, doloribus aliquam! Cumque sequi sed',
      likesCount: 0,
    },
    {
      id: 3,
      message:
        'tempora qui, deserunt id eos rem harum, velit sed tempore corporis aliquid eligendi saepe cum dolorem ipsa totam placeat? Voluptas distinctio ullam animi consectetur at dolore enim laborum amet, nam minima non, doloribus aliquam! Cumque sequi sed',
      likesCount: 0,
    },
    {
      id: 4,
      message:
        'et blanditiis, nostrum neque. Facere ipsa odio a nisi pariatur tempora sequi. Enim expedita numquam voluptatibus sint nemo et fuga nulla blanditiis qu',
      likesCount: 0,
    },
  ],
  profile: null,
  isFetching: false,
  status: '',
};
test('length should increment', () => {
  const action = addPost('New post');

  const newState = profileReducer(state, action);

  expect(newState.postsData.length).toBe(5);
});

test("5th post message should be 'New post'", () => {
  const action = addPost('New post');

  const newState = profileReducer(state, action);

  expect(newState.postsData[4].message).toBe('New post');
});

test('after deleting posts length should decrement', () => {
  const action = removePost(2);

  const newState = profileReducer(state, action);

  expect(newState.postsData.length).toBe(3);
});

test('should set profile', () => {
  const profile = {};
  const action = setProfileUser(profile);

  const newState = profileReducer(state, action);

  expect(newState.profile).toBe(profile);
});

test('should set userStatus', () => {
  const action = setUserStatus('status');

  const newState = profileReducer(state, action);

  expect(newState.status).toBe('status');
});
