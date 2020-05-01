import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import Preloader from "../common/Preloader/Preloader";
import { setProfile } from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { prevId: null };
	}
	fetchProfile() {
		const userId = this.props.match.params.userId || this.props.authUserId;
		if (!userId || this.state.prevId === userId) return;
		this.setState({ prevId: userId });
		this.props.setProfile(userId);
	}
	render() {
		this.fetchProfile();
		return this.props.profile ? (
			<Profile profile={this.props.profile} />
		) : (
			<Preloader />
		);
	}
}

const mapStateToProps = (state) => ({
	profile: state.profileData.profile,
	authUserId: state.auth.userId,
});

const mapDispatchToProps = { setProfile };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(withAuthRedirect(ProfileContainer)));
