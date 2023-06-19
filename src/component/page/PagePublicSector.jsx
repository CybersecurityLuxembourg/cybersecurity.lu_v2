import React from "react";
import "./PagePublicSector.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PagePublicSector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PagePublicSector"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
