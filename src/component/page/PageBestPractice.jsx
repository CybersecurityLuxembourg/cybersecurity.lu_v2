import React from "react";
import "./PageBestPractice.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageBestPractice extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageBestPractice"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
