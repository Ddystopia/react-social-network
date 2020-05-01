import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getUsers, follow, unFollow } from "../../redux/usersReducer";

class UsersContainer extends React.Component {
	componentDidMount() {
		if (this.props.data.length === 0)
			this.props.getUsers(this.props.page, this.props.count);
	}

	changePage = (p) => this.props.getUsers(p, this.props.count);

	render() {
		return this.props.isFetching ? (
			<Preloader />
		) : (
			<Users
				data={this.props.data}
				usersCount={this.props.usersCount}
				count={this.props.count}
				page={this.props.page}
				isFollowing={this.props.isFollowing}
				changePage={this.changePage}
				follow={this.props.follow}
				unFollow={this.props.unFollow}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.usersData.users,
	page: state.usersData.page,
	count: state.usersData.count,
	usersCount: state.usersData.usersCount,
	isFetching: state.usersData.isFetching,
	isFollowing: state.usersData.isFollowing,
});

const mapDispatchToProps = {getUsers, follow, unFollow};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
