import React from "react";
import "./BoxCount.css";

export default class BoxCount extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className={"BoxCount"}>
				<img src={this.props.image}/>
				<div>{this.props.label}</div>
				<div>{this.props.count}</div>
			</div>
		);
	}
}
