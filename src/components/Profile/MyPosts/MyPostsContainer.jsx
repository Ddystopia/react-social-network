import MyPosts from "./MyPosts";
import { addPost } from "../../../redux/profileReducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	data: state.profileData.postsData,
});

const mapDispatchToProps = { addPost };

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
