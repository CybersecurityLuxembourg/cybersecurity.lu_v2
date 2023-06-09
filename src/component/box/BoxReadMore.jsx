import React from "react";
import "./BoxReadMore.css";

export default class BoxReadMore extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className={"BoxReadMore"}>
				<img src={this.props.image}/>
				<div className="title">{this.props.title}</div>
				<div className="abstract">{this.props.abstract}</div>
				<div>
					<button
						className="link"
						onClick={() => this.props.history.push(this.props.link)}>
						Read more &nbsp;<i className="fas fa-arrow-right"/>
					</button>
				</div>
			</div>
		);
	}
}
