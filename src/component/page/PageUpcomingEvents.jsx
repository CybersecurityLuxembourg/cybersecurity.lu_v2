import React from "react";
import "./PageUpcomingEvents.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import SectionEvents from "../section/SectionEvents.jsx";
import SectionCSWL from "../section/SectionCSWL.jsx";
import { getUrlParameter } from "../../utils/url.jsx";

export default class PageUpcomingEvents extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	goToDiv(id) {
		const elmnt = document.getElementById(id);
		elmnt.scrollIntoView();
	}

	// eslint-disable-next-line class-methods-use-this
	isOnUpcomingTab() {
		return getUrlParameter("tab") !== "past";
	}

	render() {
		return (
			<div id={"PageUpcomingEvents"}>
				<div className="max-sized-section">
					<div className={"top-content"}>
						<div className="row">
							<div className="col-md-6">
								<Breadcrumb>
									<Breadcrumb.Item><Link to="/">News & Events</Link></Breadcrumb.Item>
									{this.isOnUpcomingTab()
										? <Breadcrumb.Item><Link to="/events">Upcoming events</Link></Breadcrumb.Item>
										: <Breadcrumb.Item><Link to="/events?tab=past">Past events</Link></Breadcrumb.Item>
									}
								</Breadcrumb>

								<div className="text-content">
									<h4>
										{this.isOnUpcomingTab()
											? "Upcoming events"
											: "Past events"
										}
									</h4>

									<p>
										{this.isOnUpcomingTab()
											? "Join the upcoming events on cybersecurity"
											: "Consult all the past events on cybersecurity"
										}
									</p>
								</div>

								<div className="buttons">
									<button
										className="transparent"
										onClick={() => this.goToDiv("SectionEvents")}
									>
										{this.isOnUpcomingTab()
											? "See all upcoming events"
											: "See all past events"
										}
									</button>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<div className="vertically-centered">
									<img
										className={"logo"}
										src="/img/Skyline.png"
										alt="Skyline Luxembourg"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className={"news-content"}>
						<div className="row">
							<div className="col-md-12">
								<SectionEvents
									taxonomies={this.props.taxonomies}
									numberOfArticles={6}
									showPagination={true}
									{...this.props}
								/>
							</div>
						</div>
					</div>
				</div>

				<SectionCSWL/>
			</div>
		);
	}
}
