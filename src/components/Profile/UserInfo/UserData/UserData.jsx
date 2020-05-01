import React from "react";
import classNames from "./UserData.module.css";

class UserData extends React.Component {
	state = { editMode: false, status: this.props.status };
	statusOnChange = (e) => {
		this.setState({ status: e.target.value });
	};

	anabelEditMode = () => {
		if (this.props.authUserId !== this.props.profile.userId) return;
		this.setState({ editMode: true });
	};

	disableEditMode = () => {
		this.setState({ editMode: false });
		if (this.props.status === this.state.status) return;
		if (this.state.status.length > 299) return;
		this.props.updateUserStatus(this.state.status || "");
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status !== this.props.status)
			this.setState({ status: this.props.status });
	}

	render() {
		const props = this.props;

		return (
			<article className={classNames.user_info_text}>
				<h3>{props.profile.fullName || "-----"}</h3>
				<div>About me: {props.profile.aboutMe || "-----"}</div>
				<div className={classNames.statusContainer}>
					Status:
					{this.state.editMode ? (
						<input
							className={classNames.input}
							autoFocus={true}
							onBlur={this.disableEditMode}
							type="text"
							value={this.state.status}
							onChange={this.statusOnChange}
						/>
					) : (
						<div
							className={classNames.status}
							onDoubleClick={this.anabelEditMode}
						>
							{props.status || "-----"}
						</div>
					)}
				</div>
				<div>
					Looking for a job:
					<div
						className={classNames.circle}
						style={{
							backgroundColor: props.profile.lookingForAJob ? "green" : "red",
						}}
					></div>
					{props.profile.lookingForAJobDescription ||
					props.profile.lookingForAJob
						? "-----"
						: ""}
				</div>
			</article>
		);
	}
}
export default UserData;
