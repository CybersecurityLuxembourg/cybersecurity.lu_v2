import React from "react";
import "./PageFunding.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageFunding extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageFunding"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
