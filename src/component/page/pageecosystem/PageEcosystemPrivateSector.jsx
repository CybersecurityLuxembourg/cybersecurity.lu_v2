import React from "react";
import "./PageEcosystemPrivateSector.css";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { getUrlParameter, dictToURI } from "../../../utils/url.jsx";
import { getPrivateAppURL } from "../../../utils/env.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";
import Field from "../../form/Field.jsx";
import Count from "../../form/Count.jsx";
import Entity from "../../item/Entity.jsx";
import Dialog from "../../dialog/Dialog.jsx";
import SimpleTable from "../../table/SimpleTable.jsx";
import getLeavesOfNode from "../../../utils/taxonomy.jsx";

export default class PageEcosystemPrivateSector extends React.Component {
	constructor(props) {
		super(props);

		const initFilters = {
			name: getUrlParameter("name"),
			corebusiness_only: getUrlParameter("corebusiness_only") === "true",
			startup_only: getUrlParameter("startup_only") === "true",
			pcdoctor_only: getUrlParameter("pcdoctor_only") === "true",
			taxonomy_values: getUrlParameter("taxonomy_values")
				? getUrlParameter("taxonomy_values").split(",") : [],
		};

		this.state = {
			valueChainOrder: ["IDENTIFY", "PROTECT", "DETECT", "RESPOND", "RECOVER"],
			serviceProviders: null,
			initFilters,
			filters: initFilters,
			openClassifications: [],
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
							.concat(ecosystemRoles)
							.concat(this.state.filters.taxonomy_values)
							.concat(this.getPcDoctorTaxonomyValues()),
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

	getPcDoctorTaxonomyValues() {
		if (this.props.taxonomies && this.state.filters.pcdoctor_only) {
			return this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "ENTITY TARGET")
				.filter((v) => v.name === "INDIVIDUAL")
				.map((v) => v.id);
		}

		return [];
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

	buildClassificationFilters() {
		if (!this.props.taxonomies) {
			return <Loading/>;
		}

		const result = [];

		const solutionCategories = this.props.taxonomies.taxonomy_values
			.filter((c) => c.category === "VALUE CHAIN")
			.sort((a, b) => this.state.valueChainOrder.indexOf(a.name)
				- this.state.valueChainOrder.indexOf(b.name));

		for (let i = 0; i < solutionCategories.length; i++) {
			result.push(
				<div>
					{this.state.openClassifications.indexOf(solutionCategories[i].name) >= 0
						? <span
							className="checkbox-chevron"
							onClick={() => (
								this.setState({
									openClassifications:
										this.state.openClassifications
											.filter((o) => o !== solutionCategories[i].name),
								}))}>
							<i className="fas fa-chevron-down"/>
						</span>
						: <span
							className="checkbox-chevron"
							onClick={() => (
								this.setState({
									openClassifications:
										this.state.openClassifications
											.concat([solutionCategories[i].name]),
								}))}>
							<i className="fas fa-chevron-right"/>
						</span>
					}

					<Field
						className="checkbox-category"
						type="checkbox"
						checkBoxLabel={<b>{solutionCategories[i].name}</b>}
						value={this.state.filters.taxonomy_values.indexOf(solutionCategories[i].id) >= 0}
						onChange={(v) => this.modifyFilters(
							"taxonomy_values",
							v
								? this.state.filters.taxonomy_values.concat([solutionCategories[i].id])
								: this.state.filters.taxonomy_values.filter((o) => o !== solutionCategories[i].id),
						)}
						hideLabel={true}
					/>
				</div>,
			);

			if (this.state.openClassifications.indexOf(solutionCategories[i].name) >= 0) {
				getLeavesOfNode(this.props.taxonomies, [solutionCategories[i]]).forEach((l) => {
					result.push(
						<Field
							className="checkbox-subcategory"
							type="checkbox"
							checkBoxLabel={l.name}
							value={this.state.filters.taxonomy_values.indexOf(l.id) >= 0
								|| this.state.filters.taxonomy_values.indexOf(solutionCategories[i].id) >= 0}
							onChange={(v) => this.modifyFilters(
								"taxonomy_values",
								v
									? this.state.filters.taxonomy_values.concat([l.id])
									: this.state.filters.taxonomy_values.filter((o) => o !== l.id),
							)}
							hideLabel={true}
						/>,
					);
				});
			}
		}

		return result;
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
								<Link
									to="/dashboard?tab=private-sector"
									title="Go to the dashboard">
									<img
										src={"/img/private-sector-charts.svg"}
										alt={"Private sector charts"}
									/>
								</Link>
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
										<h6 className="blue-text">Filter by</h6>
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
											hideLabel={true}
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
											hideLabel={true}
										/>

										<Field
											type="checkbox"
											checkBoxLabel="PC Doctors"
											value={this.state.filters.pcdoctor_only}
											onChange={() => this.modifyFilters("pcdoctor_only", !this.state.filters.pcdoctor_only)}
											hideLabel={true}
										/>

										<div className="grey-horizontal-bar"/>

										<div className="h8">
											CLASSIFICATION

											<Dialog
												trigger={<div>ddd</div>}
												content={<div/>}
											/>
										</div>

										{this.buildClassificationFilters()}
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-8">
							<span className="h8">
								Entities found&nbsp;&nbsp;
							</span>

							{this.state.serviceProviders
								&& this.state.serviceProviders.length > 0
								&& <Count count={this.state.serviceProviders.length}/>
							}

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
