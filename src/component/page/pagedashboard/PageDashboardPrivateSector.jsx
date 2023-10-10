import React from "react";
import "./PageDashboardPrivateSector.css";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import BoxCount from "../../box/BoxCount.jsx";
import Tab from "../../tab/Tab.jsx";
import PageDashboardPrivateSectorCompanies from "./pagedashboardprivatesector/PageDashboardPrivateSectorCompanies.jsx";
import PageDashboardPrivateSectorStartups from "./pagedashboardprivatesector/PageDashboardPrivateSectorStartups.jsx";
import { getPastDate } from "../../../utils/date.jsx";

export default class PageDashboardPrivateSector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			serviceProviders: null,
			selectedMenu: "companies",
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
				.filter((v) => v.name === "CYBERSECURITY SERVICE PROVIDER")
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

							<div className="col-md-6">
								<div className="row">
									<div className="col-md-6">
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
									</div>

									<div className="col-md-6">
										<div className="box">
											<div className="h8">
												Main point of contact
											</div>

											<div className="row">
												<div className="col-md-12 py-4">
													<a
														href="https://lhc.lu"
														target="_blank"
														rel="noreferrer"
													>
														<img
															src="/img/lhc-logo.png"
															alt="Logo LHC"
														/>
													</a>
												</div>
											</div>
										</div>
									</div>

									<div className="col-md-6">
										<BoxCount
											image={"/img/icon-plant.png"}
											label={"Created during the last 5 years"}
											count={this.getYoungCount()
												? this.getYoungCount()
												: "Loading..."}
										/>
									</div>

									<div className="col-md-6">
										<Link to="/ecosystem?tab=private-sector&startup_only=true">
											<BoxCount
												image={"/img/icon-rocket.png"}
												label={"Number of Startups"}
												count={this.getStartupCount()
													? this.getStartupCount() : "Loading..."}
											/>
										</Link>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<h5>A closer look to the private sector</h5>
							</div>

							<Tab
								onMenuClick={(m) => this.setState({ selectedMenu: m })}
								selectedMenu={this.state.selectedMenu}
								labels={["Companies", "Start-ups"]}
								keys={["companies", "startups"]}
								content={[
									<PageDashboardPrivateSectorCompanies
										key={0}
										serviceProviders={this.state.serviceProviders}
										{...this.props}
									/>,
									<PageDashboardPrivateSectorStartups
										key={1}
										serviceProviders={this.state.serviceProviders}
										{...this.props}
									/>,
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
