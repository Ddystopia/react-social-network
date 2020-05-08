import React, { useState, useEffect } from "react";
import classNames from "./UserData.module.css";

const UserData = (props) => {
	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);
	useEffect(() => {
		setStatus(props.status)		
	}, [props.status])
	
	const statusOnChange = (e) => {
		setStatus(e.target.value);
	};

	const anabelEditMode = () => {
		if (props.authUserId !== props.profile.userId) return;
		setEditMode(true);
	};

	const disableEditMode = () => {
		setEditMode(false);
		if (props.status !== status) props.updateUserStatus(status || "");
	};
	
	return (
		<article className={classNames.user_info_text}>
			<h3>{props.profile.fullName || "-----"}</h3>
			<div>About me: {props.profile.aboutMe || "-----"}</div>
			<div className={classNames.statusContainer}>
				Status:
				{editMode ? (
					<div className={classNames.textarea}>
						<textarea
							autoFocus={true}
							onBlur={disableEditMode}
							type="text"
							value={status}
							onChange={statusOnChange}
						/>
					</div>
				) : (
					<div className={classNames.status} onDoubleClick={anabelEditMode}>
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
				{props.profile.lookingForAJobDescription || props.profile.lookingForAJob
					? "-----"
					: ""}
			</div>
		</article>
	);
};
export default UserData;
