import React from "react";
import "./PageLandingLTAC.css";

export default class PageLandingLTAC extends React.Component {
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

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageLandingLTAC"}>
				<div className="max-sized-section">
					<div className="content">
						<div className="row">
							<div className="col-md-5 spaced-row">
								<img
									src="/img/image-ltac.png"
									alt="CSWL 2023"
								/>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-6">
								<div className="vertically-centered">
									<div>
										<h4><span className="blue-text">#</span> LËTZ TALK ABOUT CYBER</h4>

										<p className="catch-phrase">
											In this edition of Lëtz Talk about Cyber, Melanie
											Delannoy, CyberSec Enthusiast received Björn
											Ottersten, Director of the Interdisciplinary Centre
											for Security, Reliability and Trust (SnT).
										</p>

										<button
											className="link"
											onClick={() => this.props.history.push(
												"publications?taxonomy_values=" + this.getPodcastValueId(),
											)}>
											Listen to our podcast &nbsp;<i className="fas fa-arrow-right"/>
										</button>
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
