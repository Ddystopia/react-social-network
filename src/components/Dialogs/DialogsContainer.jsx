import React from "react";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { connect } from "react-redux";
import { sendMessage } from "../../redux/dialogReducer";

class DialogsContainer extends React.Component {
	render() {
		return (
			<Dialogs
				chatsData={this.props.chatsData}
				messagesData={this.props.messagesData}
				sendMessage={this.props.sendMessage}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	chatsData: state.dialogData.chatsData,
	messagesData: state.dialogData.messagesData,
});

const mapDispatchToProps = { sendMessage };

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(DialogsContainer);
