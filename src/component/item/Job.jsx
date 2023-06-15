import React, { Component } from "react";
import "./Job.css";
import { Link } from "react-router-dom";
import CardSocialMedia from "./CardSocialMedia.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class Job extends Component {
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

				{this.props.info.publication_date
					&& <div className="card-date">
						<i className="far fa-calendar"/> {dateToString(this.props.info.publication_date, "DD MMM YYYY")}
					</div>
				}

				<div className="card-tags"/>

				<div className="row">
					<div className="col-md-6">
						<CardSocialMedia
							article={this.props.info}
						/>
					</div>
					<div className="col-md-6">
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
			? <div className="Job card">
				<a
					href={this.props.info.link}
					target={"_blank"}
					rel="noreferrer"
					className="link">
					{this.getBoxContent()}
				</a>
			</div>
			: <div className="Job card">
				<Link
					to={"/job/" + this.props.info.handle}
					className="link">
					{this.getBoxContent()}
				</Link>
			</div>;
	}
}
