import React from "react";
import "./PageStartups.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageStartups extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageStartups"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
