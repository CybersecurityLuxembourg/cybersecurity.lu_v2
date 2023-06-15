import React from "react";
import "./ComingSoon.css";

export default class ComingSoon extends React.Component {
	render() {
		return (
			<div className="ComingSoon" style={{ height: this.props.height ? this.props.height : "100px" }}>
				<div className="ComingSoon-text">
					<i className="fas fa-tools"/>
					<div>Under construction</div>
					<div>Coming Soon</div>
				</div>
			</div>
		);
	}
}
