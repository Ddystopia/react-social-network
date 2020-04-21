const SEND_MESSAGE = "SEND_MESSAGE";
const CHANGE_MESSAGE_TEXTAREA_VALUE = "CHANGE_MESSAGE_TEXTAREA_VALUE";

const dialogReducer = (state, action) => {
	switch (action.type) {
		case SEND_MESSAGE:
			if(state.textareaValue.trim().length < 1 || state.textareaValue.length > 1000) break;

			const messageObj = {
				id:
					state.messagesData[
						state.messagesData.length - 1
					].id + 1,
				self: true,
				date: new Date(),
				message: state.textareaValue/* action.message */,
			};
			state.messagesData.push(messageObj);
			state.textareaValue = "";
			break;
		case CHANGE_MESSAGE_TEXTAREA_VALUE:
			state.textareaValue = action.value;
			break;
		default:
			break;
	}
	return state;
};

class SendMessageActionCreator {
	constructor() {
		this.type = SEND_MESSAGE;
	}
}

class ChangeMessageTextareaActionCreator {
	constructor(value) {
		this.value = value;
		this.type = CHANGE_MESSAGE_TEXTAREA_VALUE;
	}
}

export default dialogReducer;
export {
	ChangeMessageTextareaActionCreator,
	SendMessageActionCreator,
};
