import React from "react";
import "./PageLatestNews.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import SectionNews from "../section/SectionNews.jsx";
import { getPrivateAppURL } from "../../utils/env.jsx";

export default class PageLatestNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getPodcastValueId() {
		if (this.props.taxonomies?.taxonomy_values) {
			const value = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "RESOURCE CATEGORY" && v.name === "PODCAST")
				.pop();

			if (value) {
				return value.id;
			}
		}

		return "";
	}

	render() {
		return (
			<div id={"PageLatestNews"}>
				<div className="max-sized-section">
					<div className={"top-content"}>
						<div className="row">
							<div className="col-md-6">
								<Breadcrumb>
									<Breadcrumb.Item><Link to="/">News & Events</Link></Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/news">News</Link></Breadcrumb.Item>
								</Breadcrumb>

								<div className="text-content">
									<h4>Latest news from the community</h4>

									<p>
										The latest cybersecurity ecosystem
										news, interviews, technologies, and resources.
									</p>
								</div>

								<div className="buttons">
									<button
										onClick={() => window.open(
											getPrivateAppURL(),
											"_blank",
										)}>
										Share your latest news
									</button>
									<button
										className="transparent"
										onClick={() => window.open(
											"https://newsletter.cybersecurity-luxembourg.com",
											"_blank",
										)}
									>
										Subscribe to the newsletter &nbsp;<i className="fas fa-paper-plane"/>
									</button>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<div className="vertically-centered">
									<img
										className={"logo"}
										src="/img/Skyline.svg"
										alt="Skyline Luxembourg"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className={"news-content"}>
						<div className="row">
							<div className="col-md-12">
								<SectionNews
									taxonomies={this.props.taxonomies}
									numberOfArticles={9}
									showPagination={true}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={"podcast-content"}>
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-4 spaced-row">
								<h4 className="blue-text">Our Podcasts</h4>

								<div>The latest industry news, interviews, technologies, and resources.</div>

								<button
									onClick={() => this.props.history.push(
										"publications?taxonomy_values=" + this.getPodcastValueId(),
									)}>
									View all podcasts
								</button>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-7">
								<div className="row">
									<div className="col-md-4 spaced-row">
										<img src="/img/ltac-image.svg"/>
									</div>

									<div className="col-md-8 spaced-row">
										<h5><span className="blue-text">#</span> LËTZ TALK ABOUT CYBER</h5>

										In this edition of Lëtz Talk about Cyber, Melanie
										Delannoy, CyberSec Enthusiast received Björn
										Ottersten, Director of the Interdisciplinary Centre
										for Security, Reliability and Trust (SnT).
									</div>
								</div>

								<div className="row">
									<div className="col-md-4 spaced-row">
										<img src="/img/breakfast-image.svg"/>
									</div>

									<div className="col-md-8 spaced-row">
										<h5><span className="blue-text">#</span> CYBERSECURITY Breakfast</h5>

										CYBERSECURITY Breakfast Podcast tackles trending or pressing cybersecurity
										topics. National and international experts from
										various field of activities discuss their views
										and experiences.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
