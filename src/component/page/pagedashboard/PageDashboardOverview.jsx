import React from "react";
import "./PageDashboardOverview.css";
import { Doughnut } from "react-chartjs-2";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import BoxCount from "../../box/BoxCount.jsx";
import Loading from "../../box/Loading.jsx";

export default class PageDashboardOverview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			serviceProviders: null,
			publicEntities: null,
			associations: null,
		};
	}

	componentDidMount() {
		this.getServiceProviders();
		this.getPublicEntities();
		this.getAssociations();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.getServiceProviders();
			this.getPublicEntities();
			this.getAssociations();
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

	getPublicEntities() {
		if (this.props.taxonomies
			&& this.props.taxonomies.taxonomy_values) {
			const entityTypes = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE")
				.filter((v) => v.name === "PUBLIC SECTOR")
				.map((v) => v.id);

			if (entityTypes.length > 0) {
				this.setState({
					publicEntities: null,
				}, () => {
					const params = {
						...this.state.filters,
						taxonomy_values: entityTypes,
					};

					getRequest.call(this, "public/get_public_entities?" + dictToURI(params), (data) => {
						this.setState({
							publicEntities: data,
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

	getAssociations() {
		if (this.props.taxonomies
			&& this.props.taxonomies.taxonomy_values) {
			const entityTypes = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE")
				.filter((v) => v.name === "CIVIL SOCIETY")
				.map((v) => v.id);

			if (entityTypes.length > 0) {
				this.setState({
					associations: null,
				}, () => {
					const params = {
						...this.state.filters,
						taxonomy_values: entityTypes,
					};

					getRequest.call(this, "public/get_public_entities?" + dictToURI(params), (data) => {
						this.setState({
							associations: data,
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

	render() {
		return (
			<div id={"PageDashboardOverview"}>
				<div className="max-sized-section">
					<div className="content">
						<div className="row spaced-row">
							<div className="col-md-6">
								<div className="title">
									<h2>Ecosystem Overview</h2>
								</div>
							</div>

							<div className="col-md-6">
								<div className={"total-entities"}>
									<h2 className="count">
										{this.state.publicEntities
											&& this.state.serviceProviders
											&& this.state.associations
											? this.state.publicEntities.length
											+ this.state.serviceProviders.length
											+ this.state.associations.length
											: "Loading..."
										}
									</h2>

									<h6>
										Entities are part of the ecosystem
									</h6>
								</div>
								<BoxCount
									image={"/img/icon-institution.png"}
									label={"Public Entities"}
									count={this.state.publicEntities
										? this.state.publicEntities.length : "Loading..."}
								/>
							</div>

							<div className="col-md-3">
								<BoxCount
									image={"/img/icon-building-blue.png"}
									label={"Private Companies"}
									count={this.state.serviceProviders
										? this.state.serviceProviders.length : "Loading..."}
								/>
								<BoxCount
									image={"/img/icon-group.png"}
									label={"Clubs, Associations & Initiatives"}
									count={this.state.associations
										? this.state.associations.length : "Loading..."}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<h5>A closer look to the Ecosystem</h5>
							</div>
						</div>

						<div className="row">
							<div className="offset-md-3 col-md-6">
								<div className="box">
									<div className="row">
										<div className="col-md-12">
											<h6>The National Governance</h6>

											<div className="grey-horizontal-bar"/>
										</div>

										<div className="col-md-4">
											<img
												className={"logo"}
												src="/img/double-petals.png"
												alt="Petals"
											/>
										</div>

										<div className="col-md-8 governance-box-content">
											<h3>Prime minister</h3>

											<div className="grey-vertical-bar"/>

											<h5>National Strategy</h5>

											<div className="grey-vertical-bar"/>

											<div className="h8">Interministerial Coordination Committee
											for Cyber prevention and Cybersecurity</div>
										</div>

										<div className="col-md-12">
											<div className="right-buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("dashboard?tab=public-sector")}>
													Read more about the initiative &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row spaced-row">
							<div className="col-md-4">
								<div className="box sector-box">
									<div className="row">
										<div className="col-md-12">
											<h6>Public Sector</h6>

											<div className="grey-horizontal-bar"/>
										</div>

										<div className="col-md-12 sector-box-logo">
											<i className="fas fa-landmark"/>
										</div>

										<div className="col-md-12">
											<p>
												Single point of contact dedicated to the treatment
												of IT incidents affecting the information systems
												of the government and operators of critical
												infrastructures (private and public) defined
												as operating in Luxembourg
											</p>
										</div>

										<div className="col-md-12">
											<div className="right-buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("ecosystem?tab=public-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-4">
								<div className="box sector-box">
									<div className="row">
										<div className="col-md-12">
											<h6>Clubs, Associations & Initiatives</h6>

											<div className="grey-horizontal-bar"/>
										</div>

										<div className="col-md-12 sector-box-logo">
											<i className="fas fa-users"/>
										</div>

										<div className="col-md-12">
											<p>
												These dynamic communities serve as catalysts for
												connection, collaboration, and positive change.
												Whether you&apos;re seeking personal growth or professional
												networking, these diverse groups offer an incredible array
												of opportunities.
											</p>
										</div>

										<div className="col-md-12">
											<div className="right-buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("ecosystem?tab=initiatives")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-4">
								<div className="box sector-box">
									<div className="row">
										<div className="col-md-12">
											<h6>Private Sector</h6>

											<div className="grey-horizontal-bar"/>
										</div>

										<div className="col-md-12 sector-box-logo">
											<i className="fas fa-building"/>
										</div>

										<div className="col-md-12">
											<p>
												Backbone of leading-edge cyber resilience in
												Luxembourg.
												LHC aims at capitalizing on and further
												developing innovation, competencies,
												collaboration and capacity building in the
												field of cybersecurity.
											</p>
										</div>

										<div className="col-md-12">
											<div className="right-buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("ecosystem?tab=private-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<div className="box">
									<div className="row">
										<div className="col-md-12">
											<h6>Companies Supplying Cybersecurity</h6>

											<div className="grey-horizontal-bar"/>
										</div>
									</div>

									{this.state.serviceProviders
										? <div className="row">
											<div className="col-md-4 offset-md-1">
												<div className="donut-wrapper">
													<Doughnut
														className="big-donut"
														data={{
															datasets: [
																{
																	data: [
																		this.state.serviceProviders
																			.filter((s) => s.is_cybersecurity_core_business)
																			.length,
																		this.state.serviceProviders.length
																			- this.state.serviceProviders
																				.filter((s) => s.is_cybersecurity_core_business)
																				.length,
																	],
																	backgroundColor: [
																		"rgba(233, 56, 66, 1)",
																		"rgba(233, 56, 66, 0.2)",
																	],
																	borderWidth: 0,
																},
															],
														}}
														options={{
															cutout: "94%",
															layout: {
																padding: 5,
															},
														}}
													/>

													<Doughnut
														className="small-donut"
														data={{
															datasets: [
																{
																	data: [
																		this.state.serviceProviders
																			.filter((s) => s.is_cybersecurity_core_business)
																			.filter((s) => s.is_startup)
																			.length,
																		this.state.serviceProviders
																			.filter((s) => s.is_startup)
																			.length
																			- this.state.serviceProviders
																				.filter((s) => s.is_cybersecurity_core_business)
																				.filter((s) => s.is_startup)
																				.length,
																	],
																	backgroundColor: [
																		"rgba(51, 173, 255, 1)",
																		"rgba(51, 173, 255, 0.2)",
																	],
																	borderWidth: 0,
																},
															],
														}}
														options={{
															cutout: "92%",
															layout: {
																padding: 30,
															},
														}}
													/>
												</div>
											</div>

											<div className="col-md-6 offset-md-1">
												<div className="row donut-description vertically-centered">
													<div className="col-md-2">
														<h3>{this.state.serviceProviders.length}</h3>
													</div>
													<div className="col-md-10">
														Companies supplying Cybersecurity in Luxembourg
													</div>
													<div className="col-md-2">
														<h3 className="red">
															{this.state.serviceProviders
																.filter((s) => s.is_cybersecurity_core_business).length}
														</h3>
													</div>
													<div className="col-md-10">
														Companies have Cybersecurity as their core business
													</div>
													<div className="col-md-2">
														<h3 className="blue">
															{Math.round((this.state.serviceProviders
																.filter((s) => s.is_cybersecurity_core_business && s.is_startup)
																.length
																* 100)
																/ this.state.serviceProviders
																	.filter((s) => s.is_startup)
																	.length)}%
														</h3>
													</div>
													<div className="col-md-10">
														of the {this.state.serviceProviders.filter((s) => s.is_startup)
															.length} Start-ups
														have cybersecurity as a core business
													</div>
												</div>
											</div>

											<div className="col-md-12">
												<div className="right-buttons">
													<button
														className="transparent"
														onClick={() => this.props.history.push("ecosystem?tab=private-sector")}
													>
														Discover the private sector &nbsp;<i className="fas fa-arrow-right"/>
													</button>
												</div>
											</div>
										</div>
										: <Loading
											height={300}
										/>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
