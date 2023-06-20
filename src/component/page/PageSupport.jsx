import React from "react";
import "./PageSupport.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageSupport extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageSupport"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
