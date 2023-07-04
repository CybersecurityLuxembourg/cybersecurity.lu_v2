import React, { Component } from "react";
import "./Count.css";

export default class Count extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return <div className="Count">
			{this.props.count}
		</div>;
	}
}
