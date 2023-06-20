import React from "react";
import "./PageSearch.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PageSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageSearch"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
