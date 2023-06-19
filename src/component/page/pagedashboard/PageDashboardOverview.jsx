import React from "react";
import "./PageDashboardOverview.css";
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
						<div className="row">
							<div className="col-md-6">
								<div className="title">
									<h2>Ecosystem Overview</h2>
								</div>
							</div>

							<div className="col-md-3">
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
									image={""}
									label={"Public Entities"}
									count={this.state.publicEntities
										? this.state.publicEntities.length : "Loading..."}
								/>
							</div>

							<div className="col-md-3">
								<BoxCount
									image={""}
									label={"Private Companies"}
									count={this.state.serviceProviders
										? this.state.serviceProviders.length : "Loading..."}
								/>
								<BoxCount
									image={""}
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
											<h1>Prime minister</h1>

											<h5>National Strategy</h5>

											<div className="h8">Interministerial Coordination Committee
											for Cyber prevention and Cybersecurity</div>
										</div>

										<div className="col-md-12">
											<div className="right-buttons">
												<button className="transparent">
													Read more about the initiative &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-4">
								<div className="box">
									<div className="row">
										<div className="col-md-12">
											<h6>Public Sector</h6>

											<div className="grey-horizontal-bar"/>
										</div>

										<div className="col-md-12">
											<img
												src="/img/govcert-logo.png"
												alt="Govcert logo"
											/>
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
													onClick={() => this.props.history.push("public-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-4">
								<div className="box">
									<div className="row">
										<div className="col-md-12">
											<h6>Clubs, Associations & Initiatives</h6>

											<div className="grey-horizontal-bar"/>
										</div>

										<div className="col-md-12">
											<img
												src="/img/govcert-logo.png"
												alt="Govcert logo"
											/>
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
													onClick={() => this.props.history.push("initiatives")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-4">
								<div className="box">
									<div className="row">
										<div className="col-md-12">
											<h6>Private Sector</h6>

											<div className="grey-horizontal-bar"/>
										</div>

										<div className="col-md-12">
											<img
												src="/img/lhc-logo.png"
												alt="LHC logo"
											/>
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
													onClick={() => this.props.history.push("private-sector")}
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
											<div className="col-md-5">
												CHART
											</div>

											<div className="col-md-7">
												text
											</div>

											<div className="col-md-12">
												<div className="right-buttons">
													<button
														className="transparent"
														onClick={() => this.props.history.push("private-sector")}
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
