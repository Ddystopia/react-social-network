import React from "react";
import classNames from "./UserInfo.module.css";

export default ({ profile }) => {
	const contacts = Object.keys(profile.contacts).map((item) => {
		const link = profile.contacts[item];
		return (
			link && (
				<li key={link}>
					{item}: <a href={link}>{link}</a>
				</li>
			)
		);
	}).filter(item => item);
	if (contacts.length === 0) contacts.push(<li key="0">Nothing contacts</li>);

	return (
		<article>
			<div>Contacts:</div>
			<ul className={classNames.linkList}>{contacts}</ul>
		</article>
	);
};
