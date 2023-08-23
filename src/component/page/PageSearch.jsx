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
import Count from "../form/Count.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import SimpleTable from "../table/SimpleTable.jsx";

export default class PageSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			articleTypes: ["NEWS", "EVENT", "TOOL", "JOB OFFER", "SERVICE", "RESOURCE"],
			taxonomyCategories: ["SERVICE GROUP", "LEGAL FRAMEWORK", "ARTICLE TYPE"],

			searchValue: getUrlParameter("r") ? decodeURI(getUrlParameter("r")) : "",
			selectedTaxonomyValues: [],
			launchedSearch: false,

			object_count: null,

			entities: null,
			NEWS: null,
			EVENT: null,
			SERVICE: null,
			TOOL: null,
			JOB_OFFER: null,
			RESOURCE: null,

			show_options: {
				entity: true,
				news: true,
				event: true,
				service: true,
				tool: true,
				jobOffer: true,
				resource: true,
			},
		};
	}

	componentDidMount() {
		this.search();
	}

	componentDidUpdate(_, prevState) {
		if (prevState.selectedTaxonomyValues !== this.state.selectedTaxonomyValues) {
			this.search();
		}
	}

	search() {
		if (this.state.searchValue && this.state.searchValue.length > 2) {
			this.setState({ launchedSearch: true });
			this.getObjectCount();
			this.getEntities();
			this.getArticles();

			this.props.history.push("/search?r=" + this.state.searchValue);
			PageSearch.trackSearch(this.state.searchValue);
		}
	}

	getObjectCount() {
		if (this.state.searchValue && this.state.searchValue.length > 2) {
			const filters = {
				name: this.state.searchValue,
				taxonomy_values: this.state.selectedTaxonomyValues,
				include_articles: true,
				include_entities: true,
				include_article_types: this.state.articleTypes,
				include_taxonomy_categories: this.state.taxonomyCategories,
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
				taxonomy_values: this.state.selectedTaxonomyValues,
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
			const filters = {
				title: this.state.searchValue,
				taxonomy_values: this.state.selectedTaxonomyValues,
				include_tags: "true",
				type,
				page,
				per_page: 4,
			};

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
			&& this.state.SERVICE
			&& this.state.RESOURCE;
	}

	static trackSearch(k) {
		// eslint-disable-next-line no-underscore-dangle,no-multi-assign
		const paq = window._paq = window._paq || [];
		paq.push(["trackSiteSearch", k]);
	}

	clearFilters() {
		this.setState({
			searchValue: "",
			selectedTaxonomyValues: [],
			launchedSearch: false,
		}, () => {
			this.search();
		});
	}

	isTaxonomyValueSelected(category, value) {
		if (!this.props.taxonomies?.taxonomy_values) {
			return false;
		}

		const values = this.props.taxonomies.taxonomy_values
			.filter((v) => v.category === category)
			.filter((v) => v.name === value);

		if (values.length !== 1) {
			return false;
		}

		return this.state.selectedTaxonomyValues
			.indexOf(this.getIdOfTaxonomyValue(category, value)) >= 0;
	}

	getIdOfTaxonomyValue(category, value) {
		if (!this.props.taxonomies?.taxonomy_values) {
			return false;
		}

		const values = this.props.taxonomies.taxonomy_values
			.filter((v) => v.category === category)
			.filter((v) => v.name === value);

		if (values.length !== 1) {
			return false;
		}

		return values[0].id;
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
											onClick={() => this.search()}
											disabled={this.state.searchValue.length < 3}>
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

						{this.state.launchedSearch
							&& <div className="col-md-12">
								<div className="result-section">
									<div className="row">
										<div className="col-md-3">
											<div className="box filter-box">
												<div className="row">
													<div className="col-md-7">
														<h6 className="blue-text">Filter by</h6>
													</div>

													<div className="col-md-5">
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

														{this.state.object_count?.entity?.total > 0
															&& <div className="filter-row">
																<Field
																	type="checkbox"
																	checkBoxLabel="Entities"
																	value={this.state.show_options.entity}
																	onChange={() => this.setState({
																		show_options: {
																			...this.state.show_options,
																			entity: !this.state.show_options.entity,
																		},
																	})}
																	hideLabel={true}
																/>
																<Count
																	count={this.state.object_count.entity.total}
																/>
															</div>
														}

														{this.state.object_count?.article?.news > 0
															&& <div className="filter-row">
																<Field
																	type="checkbox"
																	checkBoxLabel="News"
																	value={this.state.show_options.news}
																	onChange={() => this.setState({
																		show_options: {
																			...this.state.show_options,
																			news: !this.state.show_options.news,
																		},
																	})}
																	hideLabel={true}
																/>
																<Count
																	count={this.state.object_count.article.news}
																/>
															</div>
														}

														{this.state.object_count?.article?.event > 0
															&& <div className="filter-row">
																<Field
																	type="checkbox"
																	checkBoxLabel="Events"
																	value={this.state.show_options.event}
																	onChange={() => this.setState({
																		show_options: {
																			...this.state.show_options,
																			event: !this.state.show_options.event,
																		},
																	})}
																	hideLabel={true}
																/>
																<Count
																	count={this.state.object_count.article.event}
																/>
															</div>
														}

														{this.state.object_count?.article?.service > 0
															&& <div className="filter-row">
																<Field
																	type="checkbox"
																	checkBoxLabel="Services"
																	value={this.state.show_options.service}
																	onChange={() => this.setState({
																		show_options: {
																			...this.state.show_options,
																			service: !this.state.show_options.service,
																		},
																	})}
																	hideLabel={true}
																/>
																<Count
																	count={this.state.object_count.article.service}
																/>
															</div>
														}

														{this.state.object_count?.article?.tool > 0
															&& <div className="filter-row">
																<Field
																	type="checkbox"
																	checkBoxLabel="Tools"
																	value={this.state.show_options.tool}
																	onChange={() => this.setState({
																		show_options: {
																			...this.state.show_options,
																			tool: !this.state.show_options.tool,
																		},
																	})}
																	hideLabel={true}
																/>
																<Count
																	count={this.state.object_count.article.tool}
																/>
															</div>
														}

														{this.state.object_count?.article?.["job offer"] > 0
															&& <div className="filter-row">
																<Field
																	type="checkbox"
																	checkBoxLabel="Job offers"
																	value={this.state.show_options.jobOffer}
																	onChange={() => this.setState({
																		show_options: {
																			...this.state.show_options,
																			jobOffer: !this.state.show_options.jobOffer,
																		},
																	})}
																	hideLabel={true}
																/>
																<Count
																	count={this.state.object_count.article["job offer"]}
																/>
															</div>
														}

														{this.state.object_count?.article?.resource > 0
															&& <div className="filter-row">
																<Field
																	type="checkbox"
																	checkBoxLabel="Resource"
																	value={this.state.show_options.resource}
																	onChange={() => this.setState({
																		show_options: {
																			...this.state.show_options,
																			resource: !this.state.show_options.resource,
																		},
																	})}
																	hideLabel={true}
																/>
																<Count
																	count={this.state.object_count.article.resource}
																/>
															</div>
														}
													</div>
												</div>

												<div className="row">
													<div className="col-md-12">
														<div className="grey-horizontal-bar"/>

														<div className="h8">
															TOPIC
														</div>

														{this.state.object_count?.taxonomy
															&& Object.keys(this.state.object_count?.taxonomy).map((t) => (
																Object.keys(this.state.object_count.taxonomy[t]).map((v) => {
																	if (this.state.object_count.taxonomy[t][v] > 0) {
																		return <div className="filter-row" key={v}>
																			<Field
																				type="checkbox"
																				checkBoxLabel={v}
																				value={this.isTaxonomyValueSelected(t, v)}
																				onChange={(o) => this.setState({
																					selectedTaxonomyValues:
																						o
																							? this.state.selectedTaxonomyValues
																								.concat([this.getIdOfTaxonomyValue(t, v)])
																							: this.state.selectedTaxonomyValues
																								.filter((i) => i
																									!== this.getIdOfTaxonomyValue(t, v)),
																				})}
																				hideLabel={true}
																			/>
																			<Count
																				count={this.state.object_count.taxonomy[t][v]}
																			/>
																		</div>;
																	}

																	return "";
																})
															))
														}
													</div>
												</div>
											</div>
										</div>

										<div className="col-md-1"/>

										<div className="col-md-8">
											{this.state.launchedSearch && !this.hasLoaded()
												&& <div className="row">
													<div className="col-md-12">
														<Loading
															height={300}
														/>
													</div>
												</div>
											}

											{this.state.launchedSearch && this.hasLoaded()
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
												&& this.state.show_options.entity
												&& <div className="row">
													<div className="col-md-12">
														<h6>
															Entities
														</h6>

														{this.state.object_count
															&& this.state.object_count.entity
															&& <Count
																count={this.state.object_count.entity.total}
															/>
														}

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
												&& this.state.show_options.news
												&& <div className="row">
													<div className="col-md-12">
														<h6>
															News
														</h6>

														{this.state.object_count
															&& this.state.object_count.article
															&& this.state.object_count.article.news
															&& <Count
																count={this.state.object_count.article.news}
															/>
														}

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
												&& this.state.show_options.event
												&& <div className="row">
													<div className="col-md-12">
														<h6>
															Events
														</h6>

														{this.state.object_count
															&& this.state.object_count.article
															&& this.state.object_count.article.event
															&& <Count
																count={this.state.object_count.article.event}
															/>
														}

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
												&& this.state.show_options.service
												&& <div className="row">
													<div className="col-md-12">
														<h6>
															Services
														</h6>

														{this.state.object_count
															&& this.state.object_count.article
															&& this.state.object_count.article.service
															&& <Count
																count={this.state.object_count.article.service}
															/>
														}

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
												&& this.state.show_options.tool
												&& <div className="row">
													<div className="col-md-12">
														<h6>
															Tools
														</h6>

														{this.state.object_count
															&& this.state.object_count.article
															&& this.state.object_count.article.tool
															&& <Count
																count={this.state.object_count.article.tool}
															/>
														}

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
												&& this.state.show_options.jobOffer
												&& <div className="row">
													<div className="col-md-12">
														<h6>
															Job offers
														</h6>

														{this.state.object_count
															&& this.state.object_count.article
															&& this.state.object_count.article["job offer"]
															&& <Count
																count={this.state.object_count.article["job offer"]}
															/>
														}

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

											{this.state.RESOURCE && this.state.RESOURCE.items.length > 0
												&& this.state.show_options.resource
												&& <div className="row">
													<div className="col-md-12">
														<h6>
															Resources
														</h6>

														{this.state.object_count
															&& this.state.object_count.article
															&& this.state.object_count.article["resource"]
															&& <Count
																count={this.state.object_count.article["resource"]}
															/>
														}

														<DynamicTable
															items={this.state.RESOURCE.items}
															pagination={this.state.RESOURCE.pagination}
															changePage={(page) => this.getArticlesByType("RESOURCE", page)}
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
						}
					</div>
				</div>
			</div>
		);
	}
}
