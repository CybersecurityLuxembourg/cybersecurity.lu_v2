import React from "react";
import "./PagePcDoctors.css";
import ComingSoon from "../box/ComingSoon.jsx";

export default class PagePcDoctors extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PagePcDoctors"}>
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
