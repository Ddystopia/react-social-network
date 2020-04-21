const ADD_POST = "ADD_POST";
const CHANGE_POST_TEXTAREA_VALUE = "CHANGE_POST_TEXTAREA_VALUE";

const profileReducer = (state, action) => {
	switch (action.type) {
		case ADD_POST:
			if(state.textareaValue.trim().length < 10 || state.textareaValue.trim().length > 1000) break;
			const postObj = {
				id:
					state.postsData[
						state.postsData.length - 1
					].id + 1,
				message: state.textareaValue.trim()/*action.message*/,
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

class AddPostActionCreator {
	constructor() {
		this.type = ADD_POST;
	}
}

class ChangePostTextareaActionCreator {
	constructor(value) {
		this.value = value;
		this.type = CHANGE_POST_TEXTAREA_VALUE;
	}
}
export default profileReducer;
export {
	AddPostActionCreator,
	ChangePostTextareaActionCreator,
};
