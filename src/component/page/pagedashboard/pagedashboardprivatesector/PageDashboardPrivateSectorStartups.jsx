import React from "react";
import "./PageDashboardPrivateSectorStartups.css";
import BoxWithTitle from "../../../box/BoxWithTitle.jsx";
import ChartCoreBusinessStartupDonut from "../../../chart/ChartCoreBusinessStartupDonut.jsx";
import ChartSolutionStartupHorizontalBar from "../../../chart/ChartSolutionStartupHorizontalBar.jsx";
import Loading from "../../../box/Loading.jsx";

export default class PageDashboardPrivateSectorStartups extends React.Component {
	getStartupCount() {
		if (!this.props.serviceProviders) {
			return null;
		}

		return this.props.serviceProviders.filter((a) => a.is_startup === 1).length;
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
									<ChartCoreBusinessStartupDonut
										serviceProviders={this.props.serviceProviders}
										taxonomies={this.props.taxonomies}
									/>
								</div>
								<div className="col-md-12">
									<div className="right-buttons">
										<button
											className="transparent"
											onClick={() => this.props.history.push("ecosystem?tab=private-sector&corebusiness_only=true&startup_only=true")}
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
							title={"Top 5 solutions offered by startups"}
							content={<div className="row">
								<div className="col-md-12">
									<ChartSolutionStartupHorizontalBar
										serviceProviders={this.props.serviceProviders}
										taxonomies={this.props.taxonomies}
									/>
								</div>
								<div className="col-md-12">
									<div className="right-buttons">
										<button
											className="transparent"
											onClick={() => this.props.history.push("ecosystem?tab=private-sector&startup_only=true")}
										>
											See more details on the solutions offered &nbsp;<i className="fas fa-arrow-right"/>
										</button>
									</div>
								</div>
							</div>}
						/>
					</div>

					<div className="col-md-12">
						<div className={"discover-program"}>
							<div className="row">
								<div className="col-md-5">
									<div className="vertically-centered">
										<div>
											<h4>
												Discover our start-up support program
											</h4>

											<p>
												CYBER4Growth is a collaborative platform for entrepreneurs to have
												access to state of the art cybersecurity services. The partners of
												the program are experts with extensive knowledge of start-ups needs
												in terms of financing, innovation, access to market and growth.
											</p>

											<div className="buttons">
												<button
													className="link transparent"
													onClick={() => this.props.history.push("ecosystem?tab=private-sector&startup_only=true")}
												>
													See more information &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>
								</div>

								<div className="col-md-5 offset-md-1">
									<div className="image-wrapper">
										<img
											src="/img/cyber4growth.png"
											alt="Cyber4Growth logo"
										/>
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
