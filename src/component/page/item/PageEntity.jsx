import React from "react";
import "./PageEntity.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../../../utils/request.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";
import NoImage from "../../box/NoImage.jsx";
import { getApiURL, getPrivateAppURL } from "../../../utils/env.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import DynamicTable from "../../table/DynamicTable.jsx";
import ServiceList from "../../item/ServiceList.jsx";
import Tab from "../../tab/Tab.jsx";
import Address from "../../form/Address.jsx";
import Chip from "../../form/Chip.jsx";
import News from "../../item/News.jsx";
import Event from "../../item/Event.jsx";
import Job from "../../item/Job.jsx";
import Service from "../../item/Service.jsx";
import Tool from "../../item/Tool.jsx";
import Count from "../../form/Count.jsx";

export default class PageEntity extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			entity: null,
			addresses: null,
			geolocations: null,
			news: null,
			events: null,
			jobOffers: null,
			services: null,
			tools: null,
		};
	}

	componentDidMount() {
		this.getEntityContent();
		this.getEntityAddresses();
		this.getEntityArticles("NEWS", "news");
		this.getEntityArticles("EVENT", "events");
		this.getEntityArticles("JOB OFFER", "jobOffers");
		this.getEntityArticles("TOOL", "tools");
		this.getEntityServices();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.componentDidMount();
		}
	}

	async queryData(endpoint, params = {}) {
		const urlParams = dictToURI(params);
		const url = `${endpoint}${urlParams && "?"}${urlParams}`;

		return new Promise((resolve, reject) => {
			getRequest.call(
				this,
				url,
				(data) => resolve(data),
				(response) => {
					nm.warning(response.statusText);
					reject(new Error(response.statusText));
				},
				(error) => reject(error),
			);
		});
	}

	getEntityContent() {
		const { id } = this.props.match.params;
		const entityUrl = `public/get_public_entity/${id}`;
		const geoUrl = "public/get_public_entity_geolocations";

		Promise.all([
			this.queryData(entityUrl, { include_assignments: true }),
			this.queryData(geoUrl, { ids: id }),
		])
			.then(([entity, geolocations]) => {
				this.setState({ entity, geolocations });
			})
			.catch((error) => nm.error(error.message));
	}

	getEntityArticles(type, stateKey, page = 1) {
		const params = {
			type,
			entities: this.props.match.params.id,
			page,
			per_page: 6,
		};

		this.queryData("public/get_public_articles", params)
			.then((articles) => this.setState({ [stateKey]: articles }))
			.catch((error) => nm.error(error.message));
	}

	getEntityServices() {
		const params = {
			type: "SERVICE",
			entities: this.props.match.params.id,
		};

		this.queryData("public/get_public_articles", params)
			.then((services) => this.setState({ services }))
			.catch((error) => nm.error(error.message));
	}

	getEntityAddresses() {
		const { id } = this.props.match.params;

		this.queryData(`public/get_public_entity_addresses/${id}`)
			.then((addresses) => this.setState({ addresses }))
			.catch((error) => nm.error(error.message));
	}

	hasWebsite() {
		return this.state.entity
			&& this.state.entity.website
			&& this.state.entity.website.length > 0;
	}

	hasGeolocation() {
		return this.state.geolocations
			&& this.state.geolocations.length > 0;
	}

	getEntitySummary() {
		if (this.state.entity) {
			return <>
				{this.state.entity.headline
					&& <h6>
						{this.state.entity.headline}
					</h6>
				}

				{this.state.entity.description
					&& <div>
						{this.state.entity.description}
					</div>
				}

				{this.state.entity.trade_register_number
					? <div className="titled-info">
						<div className="h8 blue-text">
							Trade register number
						</div>

						{this.state.entity.trade_register_number}
					</div>
					: ""
				}

				{this.state.entity.creation_date
					? <div className="titled-info">
						<div className="h8 blue-text">
							Creation date
						</div>

						{this.state.entity.creation_date}
					</div>
					: ""
				}
			</>;
		}

		return <div className="col-md-12">
			<Loading
				height={200}
			/>
		</div>;
	}

	getArticleContent(type, key) {
		if (this.state[key]) {
			if (this.state[key].pagination.total > 0) {
				return <DynamicTable
					items={this.state[key].items}
					pagination={this.state[key].pagination}
					changePage={(page) => this.getEntityArticles(type, key, page)}
					buildElement={(a) => <div className="col-md-4">
						{type === "NEWS"
							&& <News
								info={a}
								analytics={this.props.taxonomies}
							/>
						}
						{type === "EVENT"
							&& <Event
								info={a}
								analytics={this.props.taxonomies}
							/>
						}
						{type === "JOB OFFER"
							&& <Job
								info={a}
								analytics={this.props.taxonomies}
							/>
						}
						{type === "SERVICE"
							&& <Service
								info={a}
								showImage={true}
								analytics={this.props.taxonomies}
							/>
						}
						{type === "TOOL"
							&& <Tool
								info={a}
								analytics={this.props.taxonomies}
							/>
						}
					</div>
					}
				/>;
			}

			return <div className="col-md-12">
				<Message
					text={"No item found"}
					height={250}
				/>
			</div>;
		}

		return <div className="col-md-12">
			<Loading
				height={200}
			/>
		</div>;
	}

	getTaxonomyCategories() {
		if (this.props.taxonomies
			&& this.state.entity
			&& this.state.entity.taxonomy_assignment.length > 0) {
			const values = this.props.taxonomies.taxonomy_values
				.filter((v) => this.state.entity.taxonomy_assignment.indexOf(v.id) >= 0);
			let categories = [...new Set(values.map((v) => v.category))];
			categories.sort((a, b) => (a < b ? 1 : -1));
			categories = categories.map((c) => [c, values.filter((v) => v.category === c)]);
			return categories;
		}

		return [];
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageEntity"}>
				<div className="max-sized-section">
					<div className="top-section">
						<div className="row">
							<div className="col-md-12">
								<Breadcrumb>
									<Breadcrumb.Item><Link to="/">Cybersecurity Luxembourg</Link></Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/ecosystem">Ecosystem</Link></Breadcrumb.Item>
									{this.state.entity !== null && !this.state.loading
										? <Breadcrumb.Item>
											<Link to={"/entity/" + this.state.entity.id}>{this.state.entity.name}</Link>
										</Breadcrumb.Item>
										: ""}
								</Breadcrumb>
							</div>
						</div>

						{this.state.entity
							? <div className="row row-spaced">
								<div className="col-md-7">
									<div className="row">
										<div className="col-md-12">
											<div className="header">
												<h4>
													{this.state.entity.name}
												</h4>

												<a
													className="claim-link"
													href={
														getPrivateAppURL()
														+ "add_entity?claim_entity="
														+ this.state.entity.id
													}
													rel="noreferrer"
													target="_blank">
													<i className="fas fa-pen"/>
													CLAIM ACCESS AND REQUEST MODIFICATIONS
												</a>
											</div>

											<div className="chips">
												{this.state.entity.is_cybersecurity_core_business
													? <Chip
														label={"CYBERSECURITY AS A CORE BUSINESS"}
													/>
													: ""
												}

												{this.state.entity.is_startup
													? <Chip
														label={"STARTUP"}
													/>
													: ""
												}
											</div>

											{this.state.services?.items.length > 0
												? <Tab
													keys={["ABOUT", this.state?.services && "SERVICES"]}
													labels={[
														<div key="about" className="about-tab-header">ABOUT</div>,
														<div key="services">SERVICES<Count
															count={this.state.services?.pagination.total || "?"}/>
														</div>,
													]}
													content={[
														this.getEntitySummary(),
														// eslint-disable-next-line react/jsx-key
														<ServiceList services={this.state.services?.items || []} />,
													]}
												/> : this.getEntitySummary()
											}
										</div>
									</div>

									<div className="row">
										<div className={"col-md-12"}>
											{!this.state.entity.description
												&& !this.state.entity.trade_register_number
												&& !this.state.entity.creation_date
												&& !this.state.entity.is_cybersecurity_core_business
												&& !this.state.entity.is_startup
												&& <div className="row">
													<div className={"col-md-12"}>
														<Message
															text={"No information found"}
															height={150}
														/>
													</div>
												</div>
											}
										</div>
									</div>
								</div>

								<div className="offset-md-1 col-md-4">
									<div className="entity-card">
										<div className="row">
											<div className="col-4 entity-logo">
												{this.state.entity.image
													? <img
														src={getApiURL() + "public/get_public_image/" + this.state.entity.image}
														alt="Card image cap"
													/>
													: <NoImage/>
												}
											</div>

											<div className="col-8 entity-name">
												<span className="h8">
													{this.state.entity.name}
												</span>
											</div>

											{this.state.addresses
												&& this.state.addresses.map((a) => (
													<div className="col-md-12" key={a.id}>
														<Address
															info={a}
														/>
													</div>
												))
											}

											{(this.state.entity.twitter_url
												|| this.state.entity.linkedin_url)
												&& <div className="col-md-12 entity-socials">
													{this.state.entity.twitter_url
														&& <a
															href={this.state.entity.twitter_url}
															target="_blank"
															rel="noreferrer">
															<i className="fab fa-twitter"/>
														</a>
													}
													{this.state.entity.linkedin_url
														&& <a
															href={this.state.entity.linkedin_url}
															target="_blank"
															rel="noreferrer">
															<i className="fab fa-linkedin-in"/>
														</a>
													}
												</div>
											}

											<div className="col-md-12">
												{this.hasWebsite()
													? <button
														onClick={() => window.open(
															this.state.entity.website,
															"_blank",
														)}>
														Visit website
													</button>
													: ""
												}
											</div>
										</div>
									</div>
								</div>
							</div>
							: <Loading
								height={400}
							/>
						}
					</div>

					{this.props.taxonomies
						&& this.state.entity
						&& this.state.entity.taxonomy_assignment.length > 0
						&& <div className="row spaced-row">
							<div className="col-md-12">
								<h5>Taxonomy</h5>
							</div>

							{this.getTaxonomyCategories().map(([category, values]) => (
								<div
									key={category}
									className="col-md-4">
									<div className="row spaced-row">
										<div className="col-md-12 spaced-row">
											<div className="h8 blue-text">{category}</div>
										</div>

										<div className="col-md-12 spaced-row">
											{values.map((v) => (
												<Chip
													key={v.name}
													label={v.name}
													url={"/search?taxonomy_values=" + v.id}
												/>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					}

					{this.props.taxonomies
						&& this.state.entity
						&& <div className="row spaced-row">
							<div className="col-md-12">
								<Tab
									keys={["NEWS", "EVENTS", "JOB OFFERS", "TOOLS"]}
									labels={[
										<span key="news">NEWS <Count
											count={this.state.news ? this.state.news.pagination.total : "?"}/>
										</span>,
										<span key="news">EVENTS <Count
											count={this.state.events ? this.state.events.pagination.total : "?"}/>
										</span>,
										<span key="news">JOB OFFERS <Count
											count={this.state.jobOffers ? this.state.jobOffers.pagination.total : "?"}/>
										</span>,
										<span key="news">TOOLS <Count
											count={this.state.tools ? this.state.tools.pagination.total : "?"}/>
										</span>,
									]}
									content={[
										this.getArticleContent("NEWS", "news"),
										this.getArticleContent("EVENT", "events"),
										this.getArticleContent("JOB OFFER", "jobOffers"),
										this.getArticleContent("TOOL", "tools"),
									]}
								/>
							</div>
						</div>
					}
				</div>
			</div>
		);
	}
}
