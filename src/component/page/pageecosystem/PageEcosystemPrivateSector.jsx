import React from "react";
import "./PageEcosystemPrivateSector.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { getUrlParameter, dictToURI } from "../../../utils/url.jsx";
import { getPrivateAppURL } from "../../../utils/env.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";
import Field from "../../form/Field.jsx";
import Entity from "../../item/Entity.jsx";
import SimpleTable from "../../table/SimpleTable.jsx";

export default class PageEcosystemPrivateSector extends React.Component {
	constructor(props) {
		super(props);

		const initFilters = {
			name: getUrlParameter("name"),
			corebusiness_only: getUrlParameter("corebusiness_only") === "true",
			startup_only: getUrlParameter("startup_only") === "true",
		};

		this.state = {
			serviceProviders: null,
			initFilters,
			filters: initFilters,
		};
	}

	componentDidMount() {
		this.fetchServiceProviders();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.taxonomies !== prevProps.taxonomies) {
			this.fetchServiceProviders();
		}

		if (this.state.filters !== prevState.filters) {
			this.fetchServiceProviders();
		}
	}

	fetchServiceProviders() {
		if (this.props.taxonomies) {
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
							serviceProviders: data
								.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
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

	buildEntityList() {
		if (!this.state.serviceProviders) {
			return <Loading height={500}/>;
		}

		if (this.state.serviceProviders.length === 0) {
			return <Message height={500} text={"No entity found"}/>;
		}

		return <SimpleTable
			numberDisplayed={10}
			items={this.state.serviceProviders.map((a, i) => [a, i])}
			buildElement={(a) => (
				<div className="col-md-6">
					<Entity
						info={a}
					/>
				</div>
			)}
		/>;
	}

	modifyFilters(field, value) {
		console.log(field, value);
		const filters = { ...this.state.filters };
		filters[field] = value;
		this.setState({ filters });
	}

	clearFilters() {
		this.setState({ filters: this.state.initFilters });
	}

	// eslint-disable-next-line class-methods-use-this
	goToDiv(id) {
		const elmnt = document.getElementById(id);
		elmnt.scrollIntoView();
	}

	render() {
		return (
			<div id={"PageEcosystemPrivateSector"}>
				<div className="top-content">
					<div className="row">
						<div className="col-md-6">
							<h4>Private Sector</h4>

							<p>The private sector play a critical role in the development
							and implementation of cybersecurity solutions and services
							in Luxembourg and beyond.</p>

							<p>By bringing together private sector expertise and public
							sector resources, the cybersecurity ecosystem in Luxembourg
							is able to foster innovation and collaboration to address the
							evolving cyber threats facing organizations and individuals
							today.</p>

							<div className="buttons">
								<button
									onClick={() => window.open(
										getPrivateAppURL(),
										"_blank",
									)}>
									Join the ecosystem
								</button>
								<button
									className="transparent"
									onClick={() => this.goToDiv("PageEcosystemPrivateSector-list-content")}>
									See the full list &nbsp;<i className="fas fa-arrow-down"/>
								</button>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-5">
							<div className="vertically-centered">
								<img
									src={"/img/private-sector-charts.svg"}
									alt={"Private sector charts"}
								/>
							</div>
						</div>
					</div>
				</div>

				<div id="PageEcosystemPrivateSector-list-content" className="list-content">
					<div className="row">
						<div className="col-md-6">
							<h6>Private Sector Entities</h6>
						</div>

						<div className="col-md-6">
							<Field
								placeholder="Search entity"
								value={this.state.filters.name}
								onChange={(v) => this.modifyFilters("name", v)}
							/>
						</div>

						<div className="col-md-12">
							<div className="grey-horizontal-bar"/>
						</div>
					</div>

					<div className="row">
						<div className="col-md-3">
							<div className="box filter-box">
								<div className="row">
									<div className="col-md-6">
										<h6>Filter by</h6>
									</div>

									<div className="col-md-6">
										<div className="right-buttons">
											<button
												className="link small"
												onClick={() => this.clearFilters()}>
												Clear all
											</button>
										</div>
									</div>

									<div className="col-md-12">
										<div className="grey-horizontal-bar"/>

										<div className="h8">
											CORE BUSINESS
										</div>

										<Field
											type="checkbox"
											checkBoxLabel="Cybersecurity"
											value={this.state.filters.corebusiness_only}
											onChange={() => this.modifyFilters("corebusiness_only", !this.state.filters.corebusiness_only)}
											fullWidth={true}
										/>

										<div className="grey-horizontal-bar"/>

										<div className="h8">
											COMPANY TYPE
										</div>

										<Field
											type="checkbox"
											checkBoxLabel="Start-up"
											value={this.state.filters.startup_only}
											onChange={() => this.modifyFilters("startup_only", !this.state.filters.startup_only)}
											fullWidth={true}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-8">
							<div className="h8">Entities found</div>

							<div className="row">
								{this.buildEntityList()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
