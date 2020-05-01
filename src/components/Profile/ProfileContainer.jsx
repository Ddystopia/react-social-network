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
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
	componentDidMount() {
		const userId = this.props.match.params.userId || this.props.authUserId;
		if (!userId) return;
		this.props.setProfile(userId);
		this.props.getUserStatus(userId);
	}
	render() {
		return this.props.profile ? (
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
});

const mapDispatchToProps = { setProfile, getUserStatus, updateUserStatus };

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter,
	withAuthRedirect
)(ProfileContainer);
