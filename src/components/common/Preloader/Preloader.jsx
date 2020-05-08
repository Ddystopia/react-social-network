import React from "react";
import classNames from "./Preloader.module.css"
import preloader from "../../../assets/images/preloader.svg";

const Preloader = (props) => (
	<div className={classNames.container}>
		<img src={preloader} alt="preloader"/>
	</div>
)

export default Preloader;