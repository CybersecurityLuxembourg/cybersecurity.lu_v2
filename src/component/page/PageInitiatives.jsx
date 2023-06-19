import React from "react";
import "./PageInitiatives.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageInitiatives extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageInitiatives"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
