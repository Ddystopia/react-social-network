import React from "react";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { connect } from "react-redux";
import { sendMessage } from "../../redux/dialogReducer";

const DialogsContainer = ({chatsData, messagesData, sendMessage}) => {
	return (
		<Dialogs
			chatsData={chatsData}
			messagesData={messagesData}
			sendMessage={sendMessage}
		/>
	);
};

const mapStateToProps = (state) => ({
	chatsData: state.dialogData.chatsData,
	messagesData: state.dialogData.messagesData,
});

export default compose(
	connect(mapStateToProps, { sendMessage }),
	withAuthRedirect
)(DialogsContainer);
