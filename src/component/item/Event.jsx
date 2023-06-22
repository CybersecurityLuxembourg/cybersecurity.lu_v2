import React, { Component } from "react";
import "./Event.css";
import { Link } from "react-router-dom";
import dompurify from "dompurify";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import { dateToString } from "../../utils/date.jsx";
import CardSocialMedia from "./CardSocialMedia.jsx";

export default class Event extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getImage() {
		const baseUrl = getApiURL() + "public/get_public_image/";

		if (this.props.info.image) {
			return baseUrl + this.props.info.image;
		}

		if (!this.props.info.is_created_by_admin
			&& this.props.info.entity_tags
			&& this.props.info.entity_tags.length > 0
			&& this.props.entities) {
			const entities = this.props.entities
				.filter((c) => this.props.info.entity_tags.indexOf(c.id) >= 0)
				.filter((c) => c.image);

			if (entities.length > 0) {
				return baseUrl + entities[0].image;
			}
		}

		return null;
	}

	getBoxContent() {
		return <div>
			<div className="card-img-wrapper">
				{this.getImage()
					? <img
						className="card-img-top"
						src={this.getImage()}
						alt="Event image"/>
					: <NoImage
						height={200}
					/>
				}
			</div>
			<div className="card-body">
				{this.props.info.publication_date
					&& this.props.hidePublicationDate !== false
					&& <div className="card-date">
						{dateToString(this.props.info.publication_date, "DD MMM YYYY")}
					</div>
				}

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
			? <div className="Event card">
				<a
					href={this.props.info.link}
					target={"_blank"}
					rel="noreferrer"
					className="link">
					{this.getBoxContent()}
				</a>
			</div>
			: <div className="Event card">
				<Link
					to={"/event/" + this.props.info.handle}
					className="link">
					{this.getBoxContent()}
				</Link>
			</div>;
	}
}
