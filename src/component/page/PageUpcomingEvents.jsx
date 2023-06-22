import React from "react";
import "./PageUpcomingEvents.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import SectionEvents from "../section/SectionEvents.jsx";
import SectionCSWL from "../section/SectionCSWL.jsx";
import { getPrivateAppURL } from "../../utils/env.jsx";

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

	render() {
		return (
			<div id={"PageUpcomingEvents"}>
				<div className="max-sized-section">
					<div className={"top-content"}>
						<div className="row">
							<div className="col-md-6">
								<Breadcrumb>
									<Breadcrumb.Item><Link to="/">News & Events</Link></Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/events">Upcoming events</Link></Breadcrumb.Item>
								</Breadcrumb>

								<div className="text-content">
									<h4>Upcoming events</h4>

									<p>
										Join the upcoming events on cybersecurity
									</p>
								</div>

								<button
									onClick={() => window.open(
										getPrivateAppURL(),
										"_blank",
									)}>
									Get involved
								</button>
								<button
									className="transparent"
									onClick={() => this.goToDiv("SectionEvents")}
								>
									Set all upcoming events
								</button>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<img
									className={"logo"}
									src="/img/Skyline.png"
									alt="Skyline Luxembourg"
								/>
							</div>
						</div>
					</div>

					<div className={"news-content"}>
						<div className="row">
							<div className="col-md-12">
								<SectionEvents
									taxonomies={this.props.taxonomies}
									numberOfArticle={6}
									showPagination={true}
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
