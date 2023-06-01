import React from "react";
import "./PageLanding.css";
import PageLandingCatch from "./pagelanding/PageLandingCatch.jsx";
import PageLandingEcosystem from "./pagelanding/PageLandingEcosystem.jsx";
import PageLandingNews from "./pagelanding/PageLandingNews.jsx";

export default class PageLanding extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageLanding"}>
				<PageLandingCatch/>
				<PageLandingEcosystem/>
				<PageLandingNews/>
				{this.state.ee}
			</div>
		);
	}
}
