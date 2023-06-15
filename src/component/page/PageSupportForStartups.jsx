import React from "react";
import "./PageSupportForStartups.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageSupportForStartups extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageSupportForStartups"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
