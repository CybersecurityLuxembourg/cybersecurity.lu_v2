import React from "react";
import "./PageContact.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageContact extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageContact">
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
