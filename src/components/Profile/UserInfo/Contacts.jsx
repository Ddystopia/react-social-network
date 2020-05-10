import React from "react";
import classNames from "./UserInfo.module.css";

export default ({ profile }) => {
	const contacts = [];
	for (const item in profile.contacts) {
		const link = profile.contacts[item];
		if (!link) continue;
		contacts.push(
			<li key={link}>
				{item}: <a href={link}>{link}</a>
			</li>
		);
	}
	if (contacts.length === 0) contacts.push(<li key="0">Nothing contacts</li>);

	return <ul className={classNames.linkList}>{contacts}</ul>;
};
