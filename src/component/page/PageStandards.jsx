import React from "react";
import "./PageStandards.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageStandards extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageStandards"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
