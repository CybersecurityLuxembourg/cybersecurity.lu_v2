import React from "react";
import "./PageLegal.css";
import { NotificationManager as nm } from "react-notifications";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getUrlParameter, dictToURI } from "../../utils/url.jsx";
import { getRequest } from "../../utils/request.jsx";
import Tool from "../item/Tool.jsx";
import Count from "../form/Count.jsx";
import Field from "../form/Field.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import DynamicTable from "../table/DynamicTable.jsx";

export default class PageLegal extends React.Component {
	constructor(props) {
		super(props);

		const initFilters = {
			title: getUrlParameter("title"),
			taxonomy_values: getUrlParameter("taxonomy_values")
				? getUrlParameter("taxonomy_values").split(",") : [],
		};

		this.state = {
			articles: null,
			initFilters,
			filters: initFilters,
		};
	}

	componentDidMount() {
		this.fetchArticles();
	}

	componentDidUpdate(_, prevState) {
		if (JSON.stringify(prevState.filters) !== JSON.stringify(this.state.filters)) {
			this.fetchArticles();
		}
	}

	fetchArticles(page) {
		const params = {
			type: "TOOL",
			page: page || 1,
			per_page: 6,
			include_tags: true,
			...this.state.filters,
		};

		getRequest.call(this, "public/get_public_articles?"
			+ dictToURI(params), (data) => {
			this.setState({
				articles: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	buildArticleList() {
		if (!this.state.articles) {
			return <Loading height={500}/>;
		}

		if (this.state.articles.pagination.total === 0) {
			return <Message height={500} text={"No item found"}/>;
		}

		return <DynamicTable
			items={this.state.articles.items}
			pagination={this.state.articles.pagination}
			changePage={(page) => this.fetchArticles(page)}
			buildElement={(a) => (
				<div className="col-md-12">
					<Tool
						info={a}
					/>
				</div>
			)}
		/>;
	}

	buildClassificationFilters(category) {
		if (!this.props.taxonomies) {
			return <Loading/>;
		}

		const result = [];

		const legalCategories = this.props.taxonomies.taxonomy_values
			.filter((c) => c.category === category)
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

	render() {
		return (
			<div id="PageLegal">
				<div className="top-content">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-12">
								<Breadcrumb>
									<Breadcrumb.Item>RESOURCES & SUPPORT</Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/legal">Norms, rules & laws</Link></Breadcrumb.Item>
								</Breadcrumb>
							</div>

							<div className="col-md-12">
								<div className="text-content">
									<div className="h8 blue-text uppercase">Norms, rules & laws</div>
								</div>
							</div>

							<div className="col-md-5">
								<div className="text-content">
									<h4>Navigating the complexities of Cybersecurity laws and regulations</h4>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<p>The Cyber Awareness and Best Practice page at cybersecurity.lu is
								your source for valuable tips and resources on how to stay safe online.</p>

								<p>From best practices for secure password management to safe online
								browsing, our page provides essential information on
								cybersecurity awareness</p>
							</div>
						</div>
					</div>
				</div>

				<div className="max-sized-section">
					<div className="list-content">
						<div className="row">
							<div className="col-md-8">
								<div className="vertically-centered">
									<h6>Norms, Rules & Laws</h6>
								</div>
							</div>

							<div className="col-md-4">
								<Field
									hideLabel={true}
									placeholder="Search"
									value={this.state.filters.title}
									onChange={(v) => this.modifyFilters("title", v)}
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
												APPLICATION LEVEL
											</div>
										</div>

										<div className="col-md-12">
											{this.buildClassificationFilters("LEGAL FRAMEWORK APPLICATION LEVEL")}
										</div>

										<div className="col-md-12">
											<div className="grey-horizontal-bar"/>

											<div className="h8">
												LEGAL FRAMEWORK
											</div>
										</div>

										<div className="col-md-12">
											{this.buildClassificationFilters("LEGAL FRAMEWORK")}
										</div>

										<div className="col-md-12">
											<div className="grey-horizontal-bar"/>

											<div className="h8">
												STATUS
											</div>
										</div>

										<div className="col-md-12">
											{this.buildClassificationFilters("LEGAL FRAMEWORK STATUS")}
										</div>

										<div className="col-md-12">
											<div className="grey-horizontal-bar"/>

											<div className="h8">
												SECTOR-SPECIFIC
											</div>
										</div>

										<div className="col-md-12">
											{this.buildClassificationFilters("LEGAL FRAMEWORK SECTOR-SPECIFIC")}
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-8">
								<span className="h8">Norms, Rules & Laws</span>

								{this.state.articles
									&& this.state.articles.pagination.total > 0
									&& <Count count={this.state.articles.pagination.total}/>
								}

								<div className="row">
									{this.buildArticleList()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
