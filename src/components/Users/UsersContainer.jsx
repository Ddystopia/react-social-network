import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import {
	FollowAC,
	UnFollowAC,
	SetUsersAC,
	SePageAC,
	SetUsersCountAC,
} from "../../redux/usersReducer";
import * as axios from "axios";

class UsersContainer extends React.Component {
	componentDidMount() {
		if (this.props.data.length === 0) {
			axios
				.get(
					`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.page}&count=${this.props.count}`,
					{
						headers: { "API-KEY": "6bd488a7-8102-4f56-8668-0ba795d69754" },
					}
				)
				.then((r) => {
					this.props.setUsers(r.data.items);
					this.props.setUsersCount(r.data.totalCount);
				});
		}
	}
	changePage = (p) => {
		this.props.setPage(p);
		axios
			.get(
				`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.count}`,
				{
					headers: { "API-KEY": "6bd488a7-8102-4f56-8668-0ba795d69754" },
				}
			)
			.then((r) => {
				this.props.setUsers(r.data.items);
			});
	}
	render() {
		return (
			<Users
				data={this.props.data}
				follow={this.props.follow}
				unFollow={this.props.unFollow	}
				usersCount={this.props.usersCount}
				count={this.props.count}
				page={this.props.page}
				changePage={this.changePage}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.usersData.users,
	page: state.usersData.page,
	count: state.usersData.count,
	usersCount: state.usersData.usersCount,
});

const mapDispatchToProps = (dispatch) => ({
	follow: (userId) => dispatch(FollowAC(userId)),
	unFollow: (userId) => dispatch(UnFollowAC(userId)),
	setUsers: (users) => dispatch(SetUsersAC(users)),
	setPage: (page) => dispatch(SePageAC(page)),
	setUsersCount: (usersCount) => dispatch(SetUsersCountAC(usersCount)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UsersContainer);
