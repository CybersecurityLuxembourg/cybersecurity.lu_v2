import React from "react";
import "./PagePrivateSector.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PagePrivateSector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PagePrivateSector"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
