import MyPosts from "./MyPosts";
import {
	AddPostAC,
	ChangePostTextareaAC,
} from "../../../redux/profileReducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	data: state.profileData.postsData,
	textareaValue: state.profileData.textareaValue,
});

const mapDispatchToProps = (dispatch) => ({
	changeTextareaValue: (value) =>
		dispatch(ChangePostTextareaAC(value)),
	addPost: () => 
		dispatch(AddPostAC()),
});

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
