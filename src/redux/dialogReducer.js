const SEND_MESSAGE = "SEND_MESSAGE";
const CHANGE_MESSAGE_TEXTAREA_VALUE = "CHANGE_MESSAGE_TEXTAREA_VALUE";
const initial = {
	chatsData: [
		{ chatName: "Sasha", id: 0 },
		{ chatName: "Dasha", id: 1 },
		{ chatName: "Viktor", id: 2 },
		{ chatName: "Katya", id: 3 },
		{ chatName: "Andrew", id: 4 },
		{ chatName: "Liza", id: 5 },
		{ chatName: "Maxim", id: 6 },
		{ chatName: "Ann", id: 7 },
		{ chatName: "Tom", id: 8 },
		{ chatName: "Nastya", id: 9 },
	],
	messagesData: [
		{
			self: false,
			date: new Date(2020, 3, 13, 15, 47, 18),
			message: "Hi bro",
			id: 1,
		},
		{
			self: false,
			date: new Date(2020, 3, 13, 15, 47, 46),
			message: "How are you bro?",
			id: 2,
		},
		{
			self: true,
			date: new Date(2020, 3, 13, 15, 48, 15),
			message: "Okay bro, I can't speak",
			id: 3,
		},
		{
			self: false,
			date: new Date(2020, 3, 13, 15, 48, 30),
			message: "Okay, bye bro",
			id: 4,
		},
	],
	textareaValue: "",
};

const dialogReducer = (state = initial, action) => {
	switch (action.type) {
		case SEND_MESSAGE:
			if (
				state.textareaValue.trim().length < 1 ||
				state.textareaValue.length > 1000
			)
				break;

			const messageObj = {
				id: state.messagesData[state.messagesData.length - 1].id + 1,
				self: true,
				date: new Date(),
				message: state.textareaValue /* action.message */,
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

const SendMessageActionCreator = () => ({
	type: SEND_MESSAGE,
});

const ChangeMessageTextareaActionCreator = (value) => ({
	value: value,
	type: CHANGE_MESSAGE_TEXTAREA_VALUE,
});

export default dialogReducer;
export { ChangeMessageTextareaActionCreator, SendMessageActionCreator };
