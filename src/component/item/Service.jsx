import React, { Component } from "react";
import "./Service.css";
import { Link } from "react-router-dom";
import dompurify from "dompurify";

export default class Service extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getBoxContent() {
		return <div>
			<div className="card-body">
				<div className="card-title">
					{this.props.info.title}
				</div>

				<div className="card-text">
					<div dangerouslySetInnerHTML={{
						__html:
						dompurify.sanitize(this.props.info.abstract),
					}} />
				</div>

				<div className="row">
					<div className="col-md-12">
						<button className={"link small"}>
							Read more &nbsp;<i className="fas fa-arrow-right"/>
						</button>
					</div>
				</div>
			</div>
		</div>;
	}

	render() {
		return this.props.info.link
			&& this.props.info.link.length > 0
			? <div className="Service card">
				<a
					href={this.props.info.link}
					target={"_blank"}
					rel="noreferrer"
					className="link">
					{this.getBoxContent()}
				</a>
			</div>
			: <div className="Service card">
				<Link
					to={"/service/" + this.props.info.handle}
					className="link">
					{this.getBoxContent()}
				</Link>
			</div>;
	}
}
