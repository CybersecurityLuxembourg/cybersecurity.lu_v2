import React from "react";
import "./PagePublications.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PagePublications extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PagePublications"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
