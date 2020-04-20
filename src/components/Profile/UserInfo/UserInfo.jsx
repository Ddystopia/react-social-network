import React from "react";
import classNames from "./UserInfo.module.css";

const UserInfo = () => {
	return (
		<section className={classNames.user_info}>
			<figure className={classNames.avatar}>
				<img
					src="https://66.media.tumblr.com/0275b304a43db7298da2fb7d84fded83/tumblr_nacu2a5MJE1r1y69ho3_500.jpg"
					alt="Avatar"
				/>
			</figure>
			<article className={classNames.user_info_text}>
				<h3>Ivan Ivanov</h3>
				<p>Onegay</p>
				<p>So cool</p>
				<p>25 years</p>
			</article>
		</section>
	);
};
export default UserInfo;
