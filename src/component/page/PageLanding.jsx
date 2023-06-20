import React from "react";
import "./PageLanding.css";
import PageLandingCatch from "./pagelanding/PageLandingCatch.jsx";
import PageLandingEcosystem from "./pagelanding/PageLandingEcosystem.jsx";
import PageLandingNews from "./pagelanding/PageLandingNews.jsx";
import PageLandingNewsletter from "./pagelanding/PageLandingNewsletter.jsx";
import PageLandingEvents from "./pagelanding/PageLandingEvents.jsx";
import PageLandingCSWL from "./pagelanding/PageLandingCSWL.jsx";
import PageLandingResources from "./pagelanding/PageLandingResources.jsx";
import PageLandingLTAC from "./pagelanding/PageLandingLTAC.jsx";
import PageLandingContact from "./pagelanding/PageLandingContact.jsx";

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
				<PageLandingCatch
					{...this.props}
				/>
				<PageLandingEcosystem/>
				<PageLandingNews
					taxonomies={this.props.taxonomies}
				/>
				<PageLandingNewsletter/>
				<PageLandingEvents/>
				<PageLandingCSWL/>
				<PageLandingResources/>
				<PageLandingLTAC/>
				<PageLandingContact/>
			</div>
		);
	}
}
