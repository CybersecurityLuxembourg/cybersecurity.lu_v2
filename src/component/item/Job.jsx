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

	getSourceLabel() {
		if (this.props.info.sourceLabel) {
			return this.props.info.sourceLabel;
		}

		if (this.props.info.source) {
			return this.props.info.source.charAt(0).toUpperCase()
				+ this.props.info.source.slice(1);
		}

		return null;
	}

	getBoxContent() {
		const sourceLabel = this.getSourceLabel();
		const sourceClassSuffix = (this.props.info.source || "default").toLowerCase();
		const hasDateOrSource = this.props.info.publication_date || sourceLabel;

		return <div>
			<div className="card-body">
				<div className="card-title">
					{this.props.info.title}
				</div>

				{hasDateOrSource
					&& <div className="card-date">
						{this.props.info.publication_date
							&& <><i className="far fa-calendar"/> {dateToString(this.props.info.publication_date, "DD MMM YYYY")} </>}
						{sourceLabel
							&& <span className={`job-source job-source--${sourceClassSuffix}`}>
								{sourceLabel}
							</span>
						}
					</div>
				}

				{this.props.info.companyName
					&& <div className="job-company">
						{this.props.info.companyName}
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
