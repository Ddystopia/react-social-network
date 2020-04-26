import Chats from "./Chats";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	data: state.dialogData.chatsData,
});

const mapDispatchToProps = (dispatch) => ({});

const ChatsContainer = connect(mapStateToProps, mapDispatchToProps)(Chats);

export default ChatsContainer;
