import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";

const store = {
	_state: {
		profileData: {
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
		},
		dialogData: {
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
		},
	},
	get state() {
		return this._state;
	},
	subscribe(observer) {
		this._subscribers.push(observer);
	},
	_callSubscribers(store){
		this._subscribers.forEach(sbcr => sbcr(store))
	},
	_subscribers: [],
	dispatch(action) {
		this._state.profileReducer = profileReducer(this._state.profileData, action);
		this._state.dialogData = dialogReducer(this._state.dialogData, action);

		this._callSubscribers(store);
	},
};

window.store = store;
export default store;
