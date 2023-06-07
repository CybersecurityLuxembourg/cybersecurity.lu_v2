import React from "react";
import "./PageLandingCSWL.css";
import SectionCSWL from "../../section/SectionCSWL.jsx";

export default class PageLandingCSWL extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageLandingCSWL"}>
				<SectionCSWL/>
			</div>
		);
	}
}
