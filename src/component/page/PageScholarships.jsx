import React from "react";
import "./PageScholarships.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageScholarships extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageScholarships"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
