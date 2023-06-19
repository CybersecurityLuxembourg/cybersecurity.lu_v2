import React from "react";
import "./PageGetInvolved.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageGetInvolved extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageGetInvolved"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
