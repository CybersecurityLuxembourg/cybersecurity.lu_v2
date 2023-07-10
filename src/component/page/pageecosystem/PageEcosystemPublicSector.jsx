import React from "react";
import "./PageEcosystemPublicSector.css";
import { NotificationManager as nm } from "react-notifications";
import { Link } from "react-router-dom";
import { getRequest } from "../../../utils/request.jsx";
import { getUrlParameter, dictToURI } from "../../../utils/url.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";
import Count from "../../form/Count.jsx";
import Field from "../../form/Field.jsx";
import Entity from "../../item/Entity.jsx";
import SimpleTable from "../../table/SimpleTable.jsx";

export default class PageEcosystemPublicSector extends React.Component {
	constructor(props) {
		super(props);

		const initFilters = {
			name: getUrlParameter("name"),
			taxonomy_values: getUrlParameter("taxonomy_values")
				? getUrlParameter("taxonomy_values").split(",") : [],
		};

		this.state = {
			publicEntities: null,
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
				.filter((v) => v.name === "PUBLIC SECTOR")
				.map((v) => v.id);

			if (entityTypes.length > 0) {
				this.setState({
					publicEntities: null,
				}, () => {
					const params = {
						...this.state.filters,
						taxonomy_values: entityTypes
							.concat(this.state.filters.taxonomy_values),
					};

					getRequest.call(this, "public/get_public_entities?" + dictToURI(params), (data) => {
						this.setState({
							publicEntities: data
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
		if (!this.state.publicEntities) {
			return <Loading height={500}/>;
		}

		if (this.state.publicEntities.length === 0) {
			return <Message height={500} text={"No entity found"}/>;
		}

		return <SimpleTable
			numberDisplayed={10}
			items={this.state.publicEntities.map((a, i) => [a, i])}
			buildElement={(a) => (
				<div className="col-md-6">
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
			.filter((c) => c.category === "LEGAL FRAMEWORK")
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
			<div id={"PageEcosystemPublicSector"}>
				<div className="top-content">
					<div className="row">
						<div className="col-md-6">
							<h4>Public Sector</h4>

							<p>The public sector entities include government agencies, regulatory
							bodies, and other public sector organizations that play a critical
							role in shaping cybersecurity policy, driving cybersecurity
							innovation, and promoting cybersecurity awareness and education
							in Luxembourg.</p>

							<p>By working closely with private sector companies and other
							stakeholders, the public sector is able to create a strong and
							effective cybersecurity ecosystem that can effectively address
							the complex challenges and risks associated with cyber threats.</p>

							<div className="buttons">
								<button
									className="link"
									onClick={() => this.goToDiv("PageEcosystemPublicSector-list-content")}>
									See the full list &nbsp;<i className="fas fa-arrow-down"/>
								</button>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-5">
							<div className="vertically-centered">
								<Link
									to="/dashboard?tab=public-sector"
									title="Go to the dashboard">
									<img
										src={"/img/public-sector-charts.svg"}
										alt={"Private sector charts"}
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div id="PageEcosystemPublicSector-list-content" className="list-content">
					<div className="row">
						<div className="col-md-6">
							<h6>Public Sector Entities</h6>
						</div>

						<div className="col-md-6">
							<Field
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
											LEGAL FRAMEWORK
										</div>
									</div>

									<div className="col-md-12">
										{this.buildClassificationFilters()}
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-8">
							<span className="h8">Entities found</span>

							{this.state.publicEntities
								&& this.state.publicEntities.length > 0
								&& <Count count={this.state.publicEntities.length}/>
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
