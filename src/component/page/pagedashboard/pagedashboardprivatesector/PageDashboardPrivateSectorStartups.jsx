import React from "react";
import "./PageDashboardPrivateSectorStartups.css";
import BoxWithTitle from "../../../box/BoxWithTitle.jsx";
import ChartCoreBusinessDonut from "../../../chart/ChartCoreBusinessDonut.jsx";
import ChartSolutionHorizontalBar from "../../../chart/ChartSolutionHorizontalBar.jsx";
import { getPastDate } from "../../../../utils/date.jsx";
import Loading from "../../../box/Loading.jsx";

export default class PageDashboardPrivateSectorStartups extends React.Component {
	getStartupCount() {
		if (!this.props.serviceProviders) {
			return null;
		}

		return this.props.serviceProviders.filter((a) => a.is_startup === 1).length;
	}

	getYoungCount() {
		if (!this.props.serviceProviders) {
			return null;
		}

		return this.props.serviceProviders
			.filter((a) => a.creation_date >= getPastDate(5))
			.length;
	}

	render() {
		if (!this.props.serviceProviders) {
			return <Loading height={500}/>;
		}

		return (
			<div id={"PageDashboardPrivateSectorStartups"}>
				<div className="row">
					<div className="col-md-6">
						<BoxWithTitle
							title={"Cybersecurity as core business"}
							content={<div className="row">
								<div className="col-md-12">
									<ChartCoreBusinessDonut
										serviceProviders={this.props.serviceProviders}
										taxonomies={this.props.taxonomies}
									/>
								</div>
								<div className="col-md-12">
									<div className="right-buttons">
										<button
											className="transparent"
											onClick={() => this.props.history.push("ecosystem?tab=private-sector&corebusiness_only=true")}
										>
											See more &nbsp;<i className="fas fa-arrow-right"/>
										</button>
									</div>
								</div>
							</div>}
						/>
					</div>

					<div className="col-md-6">
						<BoxWithTitle
							title={"Diversified solutions offered by the ecosystem"}
							content={<div className="row">
								<div className="col-md-12">
									<ChartSolutionHorizontalBar
										serviceProviders={this.props.serviceProviders}
										taxonomies={this.props.taxonomies}
									/>
								</div>
								<div className="col-md-12">
									<div className="right-buttons">
										<button
											className="transparent"
											onClick={() => this.props.history.push("ecosystem?tab=private-sector")}
										>
											See more details on the solutions offered &nbsp;<i className="fas fa-arrow-right"/>
										</button>
									</div>
								</div>
							</div>}
						/>
					</div>

					<div className="col-md-12">
						<div className={"join-the-ecosystem"}>
							<div className="row">
								<div className="col-md-12">
									<h4>
										Join the ecosystem today!
									</h4>

									<p>
										Become an active member of the ecosystem
										and gain great visibility! Throughout the
										year, a wide set of actions is organised
										by the ecosystem for the ecosystem.
									</p>

									<div className="buttons">
										<button
											className="link transparent"
											onClick={() => this.props.history.push("ecosystem?tab=private-sector")}
										>
											See more information &nbsp;<i className="fas fa-arrow-right"/>
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
