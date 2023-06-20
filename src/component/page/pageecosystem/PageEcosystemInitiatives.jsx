import React from "react";
import "./PageEcosystemInitiatives.css";
import ComingSoon from "../../box/ComingSoon.jsx";

export default class PageEcosystemInitiatives extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageEcosystemInitiatives"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
