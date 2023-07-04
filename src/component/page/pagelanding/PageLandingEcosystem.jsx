import React from "react";
import "./PageLandingEcosystem.css";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import BoxCount from "../../box/BoxCount.jsx";
import { getPrivateAppURL } from "../../../utils/env.jsx";

export default class PageLandingEcosystem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			publicEntities: null,
			serviceProviders: null,
			initiatives: null,
		};
	}

	componentDidMount() {
		this.getPublicEntities();
		this.getServiceProviders();
		this.getInitiatives();
	}

	componentDidUpdate(prevProps) {
		if (this.props.taxonomies !== prevProps.taxonomies) {
			this.getPublicEntities();
			this.getServiceProviders();
			this.getInitiatives();
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

	getInitiatives() {
		if (this.props.taxonomies
			&& this.props.taxonomies.taxonomy_values) {
			const entityTypes = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE")
				.filter((v) => v.name === "CIVIL SOCIETY")
				.map((v) => v.id);

			if (entityTypes.length > 0) {
				this.setState({
					initiatives: null,
				}, () => {
					const params = {
						taxonomy_values: entityTypes,
					};

					getRequest.call(this, "public/get_public_entities?" + dictToURI(params), (data) => {
						this.setState({
							initiatives: data,
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

	render() {
		return (
			<div id={"PageLandingEcosystem"}>
				<div className="content max-sized-section">
					<div className="row">
						<div className="col-md-5">
							<div className="vertically-centered">
								<div>
									<h3>
										Join the ecosystem to secure
										Luxembourg’s <span className="blue-text">digital future</span>
									</h3>

									<div className="catch-phrase">
										Become an active member of the ecosystem and gain great
										visibility! Throughout the year, a wide set of actions
										is organised by the ecosystem for the ecosystem.
									</div>

									<button
										onClick={() => window.open(
											getPrivateAppURL(),
											"_blank",
										)}>
										Join the ecosystem
									</button>
								</div>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-3">
							<Link
								to="/dashboard?tab=private-sector"
								title="Go to the dashboard">
								<BoxCount
									image="/img/icon-building.png"
									label="Total companies"
									count={this.state.serviceProviders
										? this.state.serviceProviders.length : "Loading..."}
								/>
							</Link>
							<Link
								to="/dashboard?tab=private-sector&subtab=startups"
								title="Go to the dashboard">
								<BoxCount
									image="/img/icon-rocket.png"
									label="Total startups"
									count={this.state.serviceProviders
										? this.state.serviceProviders
											.filter((a) => a.is_startup === 1).length : "Loading..."}
								/>
							</Link>
						</div>

						<div className="col-md-3">
							<Link
								to="/dashboard?tab=public-sector"
								title="Go to the dashboard">
								<BoxCount
									className="top-margin-box"
									image="/img/icon-institution.png"
									label="Total public institutions"
									count={this.state.publicEntities
										? this.state.publicEntities.length : "Loading..."}
								/>
							</Link>
							<Link
								to="/dashboard"
								title="Go to the dashboard">
								<BoxCount
									image="/img/icon-network.png"
									label="Total initiatives"
									count={this.state.initiatives
										? this.state.initiatives.length : "Loading..."}
								/>
							</Link>
						</div>
					</div>
				</div>
				{this.state.ee}
			</div>
		);
	}
}
