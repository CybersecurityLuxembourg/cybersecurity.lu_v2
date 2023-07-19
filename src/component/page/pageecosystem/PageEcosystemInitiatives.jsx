import React from "react";
import "./PageEcosystemInitiatives.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { getUrlParameter, dictToURI } from "../../../utils/url.jsx";
import { getPrivateAppURL } from "../../../utils/env.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";
import Count from "../../form/Count.jsx";
import Field from "../../form/Field.jsx";
import Entity from "../../item/Entity.jsx";
import SimpleTable from "../../table/SimpleTable.jsx";

export default class PageEcosystemInitiatives extends React.Component {
	constructor(props) {
		super(props);

		const initFilters = {
			name: getUrlParameter("name"),
			taxonomy_values: getUrlParameter("taxonomy_values")
				? getUrlParameter("taxonomy_values").split(",") : [],
		};

		this.state = {
			serviceProviders: null,
			initFilters,
			filters: initFilters,
		};
	}

	componentDidMount() {
		this.fetchPublicEntities();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.taxonomies !== prevProps.taxonomies) {
			this.fetchPublicEntities();
		}

		if (this.state.filters !== prevState.filters) {
			this.fetchPublicEntities();
		}
	}

	fetchPublicEntities() {
		if (this.props.taxonomies) {
			const entityTypes = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE")
				.filter((v) => v.name === "CIVIL SOCIETY")
				.map((v) => v.id);

			if (entityTypes.length > 0) {
				this.setState({
					serviceProviders: null,
				}, () => {
					const params = {
						...this.state.filters,
						taxonomy_values: entityTypes
							.concat(this.state.filters.taxonomy_values),
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
			numberDisplayed={12}
			items={this.state.serviceProviders.map((a, i) => [a, i])}
			buildElement={(a) => (
				<div className="col-md-4">
					<Entity
						info={a}
					/>
				</div>
			)}
		/>;
	}

	buildClassificationFilters() {
		if (!this.props.taxonomies) {
			return <Loading/>;
		}

		const result = [];

		const legalCategories = this.props.taxonomies.taxonomy_values
			.filter((c) => c.category === "INDUSTRY VERTICAL")
			.sort((a, b) => a.name - b.name);

		for (let i = 0; i < legalCategories.length; i++) {
			result.push(
				<div>
					<Field
						className="checkbox-category"
						type="checkbox"
						checkBoxLabel={<b>{legalCategories[i].name}</b>}
						value={this.state.filters.taxonomy_values.indexOf(legalCategories[i].id) >= 0}
						onChange={(v) => this.modifyFilters(
							"taxonomy_values",
							v
								? this.state.filters.taxonomy_values.concat([legalCategories[i].id])
								: this.state.filters.taxonomy_values.filter((o) => o !== legalCategories[i].id),
						)}
						hideLabel={true}
					/>
				</div>,
			);
		}

		return result;
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

	render() {
		return (
			<div id={"PageEcosystemInitiatives"}>
				<div className="top-content">
					<div className="row">
						<div className="col-md-6">
							<h4>Clubs, Associations & Initiatives</h4>

							<p>Non-profit organizations and associations that are part
							of the cybersecurity ecosystem in Luxembourg.</p>

							<p>These organizations work to promote cybersecurity
							awareness and education among the general public, as
							well as advocate for the protection of digital rights
							and privacy.</p>

							<p>They play a crucial role in ensuring that the cybersecurity
							ecosystem in Luxembourg is inclusive, transparent, and accessible
							to all, and that the benefits of cybersecurity are realized by
							everyone in the community.</p>

							<div className="buttons">
								<button
									onClick={() => window.open(
										getPrivateAppURL(),
										"_blank",
									)}>
									Join the ecosystem
								</button>
								<button
									className="link"
									onClick={() => this.goToDiv("PageEcosystemInitiatives-list-content")}>
									See the full list &nbsp;<i className="fas fa-arrow-down"/>
								</button>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-5">
							<div className="vertically-centered">
								<img
									className={"logo"}
									src="/img/Skyline.png"
									alt="Skyline Luxembourg"
								/>
							</div>
						</div>
					</div>
				</div>

				<div id="PageEcosystemInitiatives-list-content" className="list-content">
					<div className="row">
						<div className="col-md-8">
							<div className="vertically-centered">
								<h6>Clubs, Associations & Initiatives</h6>
							</div>
						</div>

						<div className="col-md-4">
							<Field
								hideLabel={true}
								placeholder="Search entity"
								value={this.state.filters.name}
								onChange={(v) => this.modifyFilters("name", v)}
							/>
						</div>

						<div className="col-md-12">
							<div className="grey-horizontal-bar list-separator"/>
						</div>
					</div>

					<div className="row">
						{/* <div className="col-md-3">
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
											INDUSTRY VERTICAL
										</div>
									</div>

									<div className="col-md-12">
										{this.buildClassificationFilters()}
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-8"> */}

						<div className="col-md-12">
							<span className="h8">Entities found</span>

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
