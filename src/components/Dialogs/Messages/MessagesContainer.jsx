import Messages from "./Messages";
import {
	ChangeMessageTextareaAC,
	SendMessageAC,
} from '../../../redux/dialogReducer';
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	data: state.dialogData.messagesData,
	textareaValue: state.dialogData.textareaValue,
});

const mapDispatchToProps = (dispatch) => ({
	changeTextareaValue: (value) =>
		dispatch(ChangeMessageTextareaAC(value)),
	sendMessage: () => 
		dispatch(SendMessageAC()),
});

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);
export default MessagesContainer;
