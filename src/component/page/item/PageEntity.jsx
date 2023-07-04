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
import Tab from "../../tab/Tab.jsx";
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
		this.getEntityArticle("NEWS", "news");
		this.getEntityArticle("EVENT", "events");
		this.getEntityArticle("JOB OFFER", "jobOffers");
		this.getEntityArticle("SERVICE", "services");
		this.getEntityArticle("TOOL", "tools");
	}

	getEntityContent() {
		getRequest.call(this, "public/get_public_entity/"
			+ this.props.match.params.id
			+ "?include_assignments=true", (data) => {
			this.setState({
				entity: data,
			}, () => {
				getRequest.call(this, "public/get_public_entity_geolocations?ids="
					+ this.props.match.params.id, (data2) => {
					this.setState({
						geolocations: data2,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getEntityArticle(type, variable, page) {
		const params = {
			type,
			entities: this.props.match.params.id,
			page: page || 1,
			per_page: 4,
		};

		getRequest.call(this, "public/get_public_articles?"
			+ dictToURI(params), (data) => {
			this.setState({
				[variable]: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
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

	getArticleContent(type, variable) {
		if (this.state[variable]) {
			if (this.state[variable].pagination.total > 0) {
				return <DynamicTable
					items={this.state[variable].items}
					pagination={this.state[variable].pagination}
					changePage={(page) => this.getEntityArticle(type, variable, page)}
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
			<div className={"PageEntity"}>
				<div className="max-sized-section">
					<div className="row">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item><Link to="/ecosystem">Ecosystem</Link></Breadcrumb.Item>
								{this.state.entity !== null && !this.state.loading
									? <Breadcrumb.Item>
										<Link to={"/entity/" + this.state.entity.id}>{this.state.entity.name}</Link>
									</Breadcrumb.Item>
									: ""}
							</Breadcrumb>
						</div>
					</div>

					{this.state.entity !== null
						? <div className="row row-spaced">
							<div className="col-md-12">
								<div className="row">
									<div className={"col-md-4 "
										+ (this.state.entity.image
											&& this.state.entity.image
											? "PageEntity-logo" : "PageEntity-no-logo")}>
										{this.state.entity.image
											? <img
												src={getApiURL() + "public/get_public_image/" + this.state.entity.image}
												alt="Card image cap"
											/>
											: <NoImage/>
										}
									</div>
									<div className="col-md-8 PageEntity-name">
										<h4>{this.state.entity.name}</h4>

										<h5>{this.state.entity.headline}</h5>

										<a
											className="claim-link"
											href={
												getPrivateAppURL()
												+ "add_entity?claim_entity="
												+ this.state.entity.id
											}
											rel="noreferrer"
											target="_blank">
											<i className="far fa-edit"/>
											&nbsp;Claim access and request modifications
										</a>
									</div>
								</div>

								<div className="row">
									<div className={"col-md-8"}>
										<div className="row">
											<div className={"col-md-12"}>
												<h3>About</h3>
											</div>
										</div>

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

										<div className="row">
											<div className={"col-md-12"} style={{ whiteSpace: "pre-line" }}>
												{this.state.entity.description}
											</div>
										</div>

										<div className="row">
											{this.state.entity.trade_register_number
												? <div className={"col-md-12"}>
													<b>Trade register number:</b> {this.state.entity.trade_register_number}
												</div>
												: ""
											}

											{this.state.entity.creation_date
												? <div className={"col-md-12"}>
													<b>Creation date:</b> {this.state.entity.creation_date}
												</div>
												: ""
											}
										</div>

										<div className="row">
											{this.state.entity.is_cybersecurity_core_business
												&& this.state.entity.is_cybersecurity_core_business
												? <div className="col-md-12 PageEntity-stamp">
													<i className="fas fa-check-circle"/> Cybersecurity as a core business
												</div>
												: ""
											}

											{this.state.entity.is_startup
												? <div className="col-md-12 PageEntity-stamp">
													<i className="fas fa-check-circle"/> Start-up
												</div>
												: ""
											}
										</div>
									</div>

									<div className="col-md-4">
										{this.hasWebsite()
											&& <div className="shadow-section blue-shadow-section centered-shadow-section">
												{/* eslint-disable no-script-url */}
												<a
													href={!/^(?:f|ht)tps?:\/\//.test(this.state.entity.website)
														? "https://" + this.state.entity.website
														: this.state.entity.website}
													rel="noreferrer"
													target="_blank">
													<div>
														<h3>Visit website</h3>
														<i className="fas fa-globe-europe"/>
													</div>
												</a>
											</div>
										}
									</div>
								</div>
							</div>
						</div>
						: <Loading
							height={400}
						/>
					}

					{this.props.taxonomies
						&& this.state.entity
						&& this.state.entity.taxonomy_assignment.length > 0
						&& <div className="row spaced-row">
							<div className="col-md-12 spaced-row">
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
									keys={["NEWS", "EVENTS", "JOB OFFERS", "SERVICES", "TOOLS"]}
									labels={[
										<span key="news">NEWS <Count count={this.state.news
											? this.state.news.pagination.total : "?"}/></span>,
										"EVENTS (" + (this.state.events
											? this.state.events.pagination.total : "?") + ")",
										"JOB OFFERS (" + (this.state.jobOffers
											? this.state.jobOffers.pagination.total : "?") + ")",
										"SERVICES (" + (this.state.services
											? this.state.services.pagination.total : "?") + ")",
										"TOOLS (" + (this.state.tools
											? this.state.tools.pagination.total : "?") + ")",
									]}
									content={[
										this.getArticleContent("NEWS", "news"),
										this.getArticleContent("EVENT", "events"),
										this.getArticleContent("JOB OFFER", "jobOffers"),
										this.getArticleContent("SERVICE", "services"),
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
