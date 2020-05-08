import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import Preloader from "../common/Preloader/Preloader";
import {
	setProfile,
	getUserStatus,
	updateUserStatus,
} from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class ProfileContainer extends React.Component {
	componentDidMount() {
		const userId = +this.props.match.params.userId || this.props.authUserId;
		if(this.props.profile && this.props.profile.userId === userId) return;
		if(!userId) return this.props.history.push("/login")
		this.getProfile(userId);
	}
	getProfile(userId) {
		this.props.setProfile(userId);
		this.props.getUserStatus(userId);
	}
	render() {
		return this.props.profile && !this.props.isFetching ? (
			<Profile
				profile={this.props.profile}
				status={this.props.status}
				updateUserStatus={this.props.updateUserStatus}
				authUserId={this.props.authUserId}
			/>
		) : (
			<Preloader />
		);
	}
}

const mapStateToProps = (state) => ({
	profile: state.profileData.profile,
	authUserId: state.auth.userId,
	status: state.profileData.status,
	isFetching: state.profileData.isFetching,
});

const mapDispatchToProps = { setProfile, getUserStatus, updateUserStatus };

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter,
)(ProfileContainer);
