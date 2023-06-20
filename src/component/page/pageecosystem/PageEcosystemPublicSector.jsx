import React from "react";
import "./PageEcosystemPublicSector.css";
import ComingSoon from "../../box/ComingSoon.jsx";

export default class PageEcosystemPublicSector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageEcosystemPublicSector"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
