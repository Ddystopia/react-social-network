import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { getUsers, follow, unFollow } from "../../redux/usersReducer";
import { compose } from "redux";
import { getUsersData, getPage, getPageCount, getUsersCount, getIsFetching, getIsFollowing } from "../../redux/selectors/usersSelector";

class UsersContainer extends React.Component {
	componentDidMount() {
		if (this.props.data.length === 0)
			this.props.getUsers(this.props.page, this.props.pageCount);
	}

	changePage = (p) => this.props.getUsers(p, this.props.pageCount);

	render() {
		return this.props.isFetching ? (
			<Preloader />
		) : (
			<Users
				data={this.props.data}
				page={this.props.page}
				pageCount={this.props.pageCount}
				usersCount={this.props.usersCount}
				isFollowing={this.props.isFollowing}
				follow={this.props.follow}
				unFollow={this.props.unFollow}
				changePage={this.changePage}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	data: getUsersData(state),
	page: getPage(state),
	pageCount: getPageCount(state),
	usersCount: getUsersCount(state),
	isFetching: getIsFetching(state),
	isFollowing: getIsFollowing(state),
});

const mapDispatchToProps = { getUsers, follow, unFollow };

export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer);
