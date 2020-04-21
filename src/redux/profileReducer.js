const ADD_POST = "ADD_POST";
const CHANGE_POST_TEXTAREA_VALUE = "CHANGE_POST_TEXTAREA_VALUE";
const initial = {
	postsData: [
		{
			id: 1,
			message:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque, facere aperiam pariatur excepturi",
			likesCount: 0,
		},
		{
			id: 2,
			message:
				" quis ex reiciendis nulla quas impedit tempore reprehenderit ad harum, explicabo itaque praesentium optio saepe. Tempora alias consequatur aliquam ad! Natus animi aliquam magni ullam tempora qui, deserunt id eos rem harum, velit sed tempore corporis aliquid eligendi saepe cum dolorem ipsa totam placeat? Voluptas distinctio ullam animi consectetur at dolore enim laborum amet, nam minima non, doloribus aliquam! Cumque sequi sed",
			likesCount: 0,
		},
		{
			id: 3,
			message:
				"tempora qui, deserunt id eos rem harum, velit sed tempore corporis aliquid eligendi saepe cum dolorem ipsa totam placeat? Voluptas distinctio ullam animi consectetur at dolore enim laborum amet, nam minima non, doloribus aliquam! Cumque sequi sed",
			likesCount: 0,
		},
		{
			id: 4,
			message:
				"et blanditiis, nostrum neque. Facere ipsa odio a nisi pariatur tempora sequi. Enim expedita numquam voluptatibus sint nemo et fuga nulla blanditiis qu",
			likesCount: 0,
		},
	],
	textareaValue: "",
};

const profileReducer = (state = initial, action) => {
	switch (action.type) {
		case ADD_POST:
			if (
				state.textareaValue.trim().length < 10 ||
				state.textareaValue.trim().length > 1000
			)
				break;
			const postObj = {
				id: state.postsData[state.postsData.length - 1].id + 1,
				message: state.textareaValue.trim() /*action.message*/,
				likesCount: 0,
			};
			state.postsData.push(postObj);
			state.textareaValue = "";
			break;
		case CHANGE_POST_TEXTAREA_VALUE:
			state.textareaValue = action.value;
			break;
		default:
			break;
	}
	return state;
};

const AddPostActionCreator = () => ({
	type: ADD_POST,
});

const ChangePostTextareaActionCreator = (value) => ({
	value: value,
	type: CHANGE_POST_TEXTAREA_VALUE,
});

export default profileReducer;
export { AddPostActionCreator, ChangePostTextareaActionCreator };
