import React from "react";
import "./PageSearch.css";
import { NotificationManager as nm } from "react-notifications";
import Field from "../form/Field.jsx";
import { getRequest } from "../../utils/request.jsx";
import { getUrlParameter, dictToURI } from "../../utils/url.jsx";
import Entity from "../item/Entity.jsx";
import News from "../item/News.jsx";
import Event from "../item/Event.jsx";
import Tool from "../item/Tool.jsx";
import Job from "../item/Job.jsx";
import Service from "../item/Service.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import SimpleTable from "../table/SimpleTable.jsx";

export default class PageSearch extends React.Component {
	constructor(props) {
		super(props);

		const initFilters = {};

		this.state = {
			articleTypes: ["NEWS", "EVENT", "TOOL", "JOB OFFER", "SERVICE"],

			searchValue: getUrlParameter("r") ? decodeURI(getUrlParameter("r")) : "",
			initFilters,
			filters: initFilters,

			object_count: null,

			entities: null,
			NEWS: null,
			EVENT: null,
			SERVICE: null,
			TOOL: null,
			JOB_OFFER: null,
		};
	}

	componentDidMount() {
		this.search();
	}

	search() {
		this.getObjectCount();
		this.getEntities();
		this.getArticles();

		if (this.state.searchValue && this.state.searchValue.length > 2) {
			this.props.history.push("/search?r=" + this.state.searchValue);
			PageSearch.trackSearch(this.state.searchValue);
		}
	}

	getObjectCount() {
		if (this.state.searchValue && this.state.searchValue.length > 2) {
			const filters = {
				name: this.state.searchValue,
			};

			getRequest.call(this, "public/get_public_object_count?"
				+ dictToURI(filters), (data) => {
				this.setState({
					object_count: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			this.setState({
				object_count: null,
			});
		}
	}

	getEntities() {
		if (this.state.searchValue && this.state.searchValue.length > 2) {
			const filters = {
				name: this.state.searchValue,
			};

			getRequest.call(this, "public/get_public_entities?"
				+ dictToURI(filters), (data) => {
				this.setState({
					entities: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			this.setState({
				entities: null,
			});
		}
	}

	getArticles() {
		for (let i = 0; i < this.state.articleTypes.length; i++) {
			this.getArticlesByType(this.state.articleTypes[i]);
		}
	}

	getArticlesByType(type, page) {
		if (this.state.searchValue && this.state.searchValue.length > 2) {
			const filters = this.state.taxonomyValues === null
				? {
					title: this.state.searchValue,
					include_tags: "true",
					type,
					page,
					per_page: 4,
				}
				: {
					taxonomy_values: this.state.taxonomyValues,
					include_tags: "true",
					type,
					page,
					per_page: 4,
				};

			if (this.state.memberArticleOnly) {
				filters.is_created_by_admin = false;
			}

			getRequest.call(this, "public/get_public_articles?"
				+ dictToURI(filters), (data) => {
				this.setState({
					[type.replace(" ", "_")]: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			this.setState({
				[type.replace(" ", "_")]: null,
			});
		}
	}

	hasLoaded() {
		return this.state.entities
			&& this.state.NEWS
			&& this.state.EVENT
			&& this.state.TOOL
			&& this.state.JOB_OFFER
			&& this.state.SERVICE;
	}

	static trackSearch(k) {
		// eslint-disable-next-line no-underscore-dangle,no-multi-assign
		const paq = window._paq = window._paq || [];
		paq.push(["trackSiteSearch", k]);
	}

	clearFilters() {
		this.setState({ filters: this.state.initFilters });
	}

	render() {
		return (
			<div id={"PageSearch"}>
				<div className="max-sized-section">
					<div className="row">
						<div className="col-md-12">
							<div className="how-can-we-help">
								<div className="row">
									<div className="col-md-12">
										<h3>
											How can we help?
										</h3>
									</div>

									<div className="col-md-9">
										<Field
											placeholder="I have a question about cybersecurity?"
											value={this.state.searchValue}
											hideLabel={true}
											onChange={(v) => this.setState({ searchValue: v })}
										/>
									</div>

									<div className="col-md-3">
										<button
											onClick={() => this.search()}>
											Search &nbsp;<i className="fas fa-arrow-right"/>
										</button>
									</div>

									<div className="col-md-10">
										<b>Suggested search:</b>

										<button
											className="link">
											Training
										</button>

										<button
											className="link">
											Norms, Rules & Laws
										</button>

										<button
											className="link">
											Cybersecurity essentials
										</button>

										<button
											className="link">
											Startup
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-12">
							<div className="result-section">
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
														CATEGORIES
													</div>

													<Field
														type="checkbox"
														checkBoxLabel="Cybersecurity"
														value={this.state.filters.corebusiness_only}
														onChange={() => this.modifyFilters("corebusiness_only", !this.state.filters.corebusiness_only)}
														fullWidth={true}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="col-md-1"/>

									<div className="col-md-8">
										{!this.hasLoaded()
											&& (this.state.searchValue !== null && this.state.searchValue.length >= 3)
											&& <div className="row">
												<div className="col-md-12">
													<Loading
														height={300}
													/>
												</div>
											</div>
										}

										{this.state.searchValue && this.state.searchValue.length < 3
											&& <div className="row">
												<div className="col-md-12">
													<Message
														text={"The search query must contain at least 3 characters"}
														height={300}
													/>
												</div>
											</div>
										}

										{!this.state.searchValue
											&& <div className="row row-spaced">
												<div className="col-md-12">
													<Message
														text={"Please type your search query"}
														height={300}
													/>
												</div>
											</div>
										}

										{this.hasLoaded()
											&& this.state.entities.length === 0
											&& this.state.NEWS.pagination.total === 0
											&& this.state.EVENT.pagination.total === 0
											&& this.state.TOOL.pagination.total === 0
											&& this.state.JOB_OFFER.pagination.total === 0
											&& this.state.SERVICE.pagination.total === 0
											&& <div className="row row-spaced">
												<div className="col-md-12">
													<Message
														text={"No item found"}
														height={300}
													/>
												</div>
											</div>
										}

										{this.state.entities && this.state.entities.length > 0
											&& <div className="row">
												<div className="col-md-12">
													<h6>
														Entities
													</h6>

													<SimpleTable
														numberDisplayed={4}
														items={this.state.entities.map((a, i) => [a, i])}
														buildElement={(a) => (
															<div className="col-md-6">
																<Entity
																	info={a}
																/>
															</div>
														)}
													/>
												</div>
											</div>
										}

										{this.state.NEWS && this.state.NEWS.items.length > 0
											&& <div className="row">
												<div className="col-md-12">
													<h6>
														News
													</h6>

													<DynamicTable
														items={this.state.NEWS.items}
														pagination={this.state.NEWS.pagination}
														changePage={(page) => this.getArticlesByType("NEWS", page)}
														buildElement={(a) => (
															<div className="col-md-6">
																<News
																	info={a}
																	taxonomies={this.props.taxonomies}
																/>
															</div>
														)}
													/>
												</div>
											</div>
										}

										{this.state.EVENT && this.state.EVENT.items.length > 0
											&& <div className="row">
												<div className="col-md-12">
													<h6>
														Events
													</h6>

													<DynamicTable
														items={this.state.EVENT.items}
														pagination={this.state.EVENT.pagination}
														changePage={(page) => this.getArticlesByType("EVENT", page)}
														buildElement={(a) => (
															<div className="col-md-6">
																<Event
																	info={a}
																	taxonomies={this.props.taxonomies}
																/>
															</div>
														)}
													/>
												</div>
											</div>
										}

										{this.state.SERVICE && this.state.SERVICE.items.length > 0
											&& <div className="row">
												<div className="col-md-12">
													<h6>
														Services
													</h6>

													<DynamicTable
														items={this.state.SERVICE.items}
														pagination={this.state.SERVICE.pagination}
														changePage={(page) => this.getArticlesByType("SERVICE", page)}
														buildElement={(a) => (
															<div className="col-md-6">
																<Service
																	info={a}
																	taxonomies={this.props.taxonomies}
																/>
															</div>
														)}
													/>
												</div>
											</div>
										}

										{this.state.TOOL && this.state.TOOL.items.length > 0
											&& <div className="row">
												<div className="col-md-12">
													<h6>
														Tools
													</h6>

													<DynamicTable
														items={this.state.TOOL.items}
														pagination={this.state.TOOL.pagination}
														changePage={(page) => this.getArticlesByType("TOOL", page)}
														buildElement={(a) => (
															<div className="col-md-6">
																<Tool
																	info={a}
																	taxonomies={this.props.taxonomies}
																/>
															</div>
														)}
													/>
												</div>
											</div>
										}

										{this.state.JOB_OFFER && this.state.JOB_OFFER.items.length > 0
											&& <div className="row">
												<div className="col-md-12">
													<h6>
														Job offers
													</h6>

													<DynamicTable
														items={this.state.JOB_OFFER.items}
														pagination={this.state.JOB_OFFER.pagination}
														changePage={(page) => this.getArticlesByType("JOB OFFER", page)}
														buildElement={(a) => (
															<div className="col-md-6">
																<Job
																	info={a}
																	analytics={this.props.analytics}
																/>
															</div>
														)}
													/>
												</div>
											</div>
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
