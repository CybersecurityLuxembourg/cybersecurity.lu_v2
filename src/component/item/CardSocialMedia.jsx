import React, { Component } from "react";
import "./CardSocialMedia.css";
import TwitterLink from "../form/TwitterLink.jsx";
import LinkedInLink from "../form/LinkedInLink.jsx";

export default class CardSocialMedia extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return <div className={"card-social-media"}>
			<div>
				<TwitterLink
					article={this.props.article}
				/>
			</div>
			<div>
				<LinkedInLink
					article={this.props.article}
				/>
			</div>
		</div>;
	}
}
