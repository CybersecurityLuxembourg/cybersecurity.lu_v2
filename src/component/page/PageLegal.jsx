import React from "react";
import "./PageLegal.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageLegal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageLegal"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
