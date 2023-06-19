import React from "react";
import "./BoxWithTitle.css";

export default class BoxWithTitle extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className="BoxWithTitle box">
				<div className="row">
					<div className="col-md-12">
						<h6>{this.props.title}</h6>

						<div className="grey-horizontal-bar"/>
					</div>

					<div className="col-md-12">
						{this.props.content}
					</div>
				</div>
			</div>
		);
	}
}
