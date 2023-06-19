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
			<div className={"BoxCount box"}>
				<img src={this.props.image}/>
				<div className="label">{this.props.label}</div>
				<h2 className="count">{this.props.count}</h2>
			</div>
		);
	}
}
