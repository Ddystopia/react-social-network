import MyPosts from "./MyPosts";
import { addPost, changeTextareaValue } from "../../../redux/profileReducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	data: state.profileData.postsData,
	textareaValue: state.profileData.textareaValue,
});

const mapDispatchToProps = { changeTextareaValue, addPost };

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
