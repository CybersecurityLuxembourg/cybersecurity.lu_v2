import React from "react";
import "./PageDashboardPrivateSector.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import BoxCount from "../../box/BoxCount.jsx";
import BoxWithTitle from "../../box/BoxWithTitle.jsx";
import ChartCoreBusinessDonut from "../../chart/ChartCoreBusinessDonut.jsx";
import ChartSolutionHorizontalBar from "../../chart/ChartSolutionHorizontalBar.jsx";
import ChartCreationDateHorizontalBar from "../../chart/ChartCreationDateHorizontalBar.jsx";
import { getPastDate } from "../../../utils/date.jsx";

export default class PageDashboardPrivateSector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			serviceProviders: null,
		};
	}

	componentDidMount() {
		this.getServiceProviders();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.getServiceProviders();
		}
	}

	getServiceProviders() {
		if (this.props.taxonomies
			&& this.props.taxonomies.taxonomy_values) {
			const entityTypes = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE")
				.filter((v) => v.name === "PRIVATE SECTOR")
				.map((v) => v.id);

			const ecosystemRoles = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "ECOSYSTEM ROLE")
				.filter((v) => v.name === "ACTOR")
				.map((v) => v.id);

			if (entityTypes.length > 0 && ecosystemRoles.length > 0) {
				this.setState({
					serviceProviders: null,
				}, () => {
					const params = {
						...this.state.filters,
						taxonomy_values: entityTypes
							.concat(ecosystemRoles),
					};

					getRequest.call(this, "public/get_public_entities?" + dictToURI(params), (data) => {
						this.setState({
							serviceProviders: data,
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				});
			}
		}
	}

	getStartupCount() {
		if (!this.state.serviceProviders) {
			return null;
		}

		return this.state.serviceProviders.filter((a) => a.is_startup === 1).length;
	}

	getYoungCount() {
		if (!this.state.serviceProviders) {
			return null;
		}

		return this.state.serviceProviders
			.filter((a) => a.creation_date >= getPastDate(5))
			.length;
	}

	render() {
		return (
			<div id={"PageDashboardPrivateSector"}>
				<div className="max-sized-section">
					<div className="content">
						<div className="row spaced-row header">
							<div className="col-md-6">
								<div className="title">
									<h2>Private Sector</h2>
								</div>
							</div>

							<div className="col-md-3">
								<div className={"total-institutions"}>
									<h3 className="count">
										{this.state.serviceProviders
											? this.state.serviceProviders.length
											: "Loading..."
										}
									</h3>

									<h6>
										Companies are part of the ecosystem
									</h6>

									<button
										className="small"
										onClick={() => this.props.history.push("ecosystem?tab=private-sector")}
									>
										Access the full list &nbsp;<i className="fas fa-arrow-right"/>
									</button>
								</div>
								<BoxCount
									image={"/img/icon-plant.png"}
									label={"Created during the last 5 years"}
									count={this.getYoungCount()
										? this.getYoungCount()
										: "Loading..."}
								/>
							</div>

							<div className="col-md-3">
								<div className="box">
									<div className="h8">
										National contact points
									</div>

									<div className="row">
										<div className="col-md-6">
											<img
												className="fixed-height"
												src="/img/logo-circl.png"
												alt="Logo CIRCL"
											/>
											<img
												className="fixed-height"
												src="/img/logo-nc3.png"
												alt="Logo NC3"
											/>
										</div>
										<div className="col-md-6">
											<img
												className="fixed-height"
												src="/img/logo-lhc.png"
												alt="Logo LHC"
											/>
										</div>
									</div>
								</div>
								<BoxCount
									image={"/img/icon-rocket.png"}
									label={"Number of Startups"}
									count={this.getStartupCount()
										? this.getStartupCount() : "Loading..."}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<h5>A closer look to the private sector</h5>
							</div>

							<div className="col-md-6">
								<BoxWithTitle
									title={"Cybersecurity as core business"}
									content={<div className="row">
										<div className="col-md-12">
											<ChartCoreBusinessDonut
												serviceProviders={this.state.serviceProviders}
												taxonomies={this.props.taxonomies}
											/>
										</div>
										<div className="col-md-12">
											<div className="right-buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("ecosystem?tab=private-sector")}
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
												serviceProviders={this.state.serviceProviders}
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

							<div className="col-md-6">
								<BoxWithTitle
									title={"50% of companies have been created in the last 5 years"}
									content={<div className="row">
										<div className="col-md-12">
											<ChartCreationDateHorizontalBar
												serviceProviders={this.state.serviceProviders}
												taxonomies={this.props.taxonomies}
											/>
										</div>
									</div>}
								/>
							</div>

							<div className="col-md-6">
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
				</div>
			</div>
		);
	}
}
