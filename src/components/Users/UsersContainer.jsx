import { connect } from "react-redux";
import Users from "./Users";
import { FollowAC, UnFollowAC, SetUsersAC } from "../../redux/usersReducer";

const mapStateToProps = (state) => ({
	data: state.usersData.users,
});

const mapDispatchToProps = (dispatch) => ({
	follow: (userId) => dispatch(FollowAC(userId)),
	unFollow: (userId) => dispatch(UnFollowAC(userId)),
	setUsers: (users) => dispatch(SetUsersAC(users))
});

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
