import React from "react";
import { Field } from "redux-form";

export default ({text = '', ...props}) => (
	<div>
		{text && <span>{text}</span>}
		<Field {...props} />
	</div>
);
