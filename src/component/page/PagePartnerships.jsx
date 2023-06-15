import React from "react";
import "./PagePartnerships.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PagePartnerships extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PagePartnerships"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
