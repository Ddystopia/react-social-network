import React, { useEffect } from "react";
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

const ProfileContainer = ({
	match,
	authUserId,
	profile,
	history,
	setProfile,
	getUserStatus,
	status,
	updateUserStatus,
	isFetching,
}) => {
	// TODO:
	// To useEffect(fn, [profile])

	useEffect(() => {
		const userId = +match.params.userId || authUserId;
		if (profile && profile.userId === userId) return;
		if (!userId) return history.push("/login");

		const getProfile = (userId) => {
			setProfile(userId);
			getUserStatus(userId);
		};
		getProfile(userId);
	}, [match.params.userId, authUserId, profile, history, setProfile, getUserStatus]);
	return profile && !isFetching ? (
		<Profile
			profile={profile}
			status={status}
			updateUserStatus={updateUserStatus}
			authUserId={authUserId}
		/>
	) : (
		<Preloader />
	);
};

const mapStateToProps = (state) => ({
	profile: state.profileData.profile,
	authUserId: state.auth.userId,
	status: state.profileData.status,
	isFetching: state.profileData.isFetching,
});

const mapDispatchToProps = { setProfile, getUserStatus, updateUserStatus };

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter
)(ProfileContainer);
