import React from "react";
import { NavLink } from "react-router-dom";

export default ({ text, to, active, key }) => (
	<li key={key}>
		<NavLink activeClassName={active} to={to}>
			{text}
		</NavLink>
	</li>
);
