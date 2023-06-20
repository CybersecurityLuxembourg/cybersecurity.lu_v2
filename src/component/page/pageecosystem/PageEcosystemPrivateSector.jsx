import React from "react";
import "./PageEcosystemPrivateSector.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import { getPrivateAppURL } from "../../../utils/env.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";
import Field from "../../form/Field.jsx";
import Entity from "../../item/Entity.jsx";
import SimpleTable from "../../table/SimpleTable.jsx";

export default class PageEcosystemPrivateSector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			serviceProviders: null,
			filters: {},
		};
	}

	componentDidMount() {
		this.fetchServiceProviders();
	}

	componentDidUpdate(prevProps) {
		if (this.props.taxonomies !== prevProps.taxonomies) {
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

	// eslint-disable-next-line class-methods-use-this
	goToDiv(id) {
		const elmnt = document.getElementById(id);
		elmnt.scrollIntoView();
	}

	// eslint-disable-next-line class-methods-use-this
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
							/>
						</div>

						<div className="col-md-12">
							<div className="grey-horizontal-bar"/>
						</div>
					</div>

					<div className="row">
						<div className="col-md-3">
							<div className="box">
								Filter by
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
