import React from "react";
import "./PageJobsInternship.css";
import ComingSoon from "../../box/ComingSoon.jsx";

export default class PageJobsInternship extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageJobsInternship">
				<ComingSoon
					height={500}
				/>
			</div>
		);
	}
}
