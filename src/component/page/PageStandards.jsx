import React from "react";
import "./PageStandards.css";
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

export default class PageStandards extends React.Component {
	constructor(props) {
		super(props);

		const initFilters = {
			title: getUrlParameter("title"),
			taxonomy_values: getUrlParameter("taxonomy_values")
				? getUrlParameter("taxonomy_values").split(",") : [],
		};

		this.state = {
			articles: null,
			objectCount: null,
			initFilters,
			filters: initFilters,
		};
	}

	componentDidMount() {
		this.fetchArticles();
	}

	componentDidUpdate(prevProps, prevState) {
		if (JSON.stringify(prevState.filters) !== JSON.stringify(this.state.filters)) {
			this.fetchArticles();
		}

		if (prevProps.taxonomies !== this.props.taxonomies) {
			this.fetchArticles();
		}
	}

	fetchArticles(page) {
		if (this.props.taxonomies) {
			const standardValues = this.getStandardTaxonomyValueId();

			if (standardValues.length > 0) {
				const params = {
					type: "TOOL",
					page: page || 1,
					per_page: 6,
					include_tags: true,
					title: this.state.filters.title,
					taxonomy_values: this.state.filters.taxonomy_values
						.concat(standardValues),
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
			} else {
				nm.warning("Standard taxonomy value not found. Please contact administrators");
			}
		}
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
				<div className="col-md-6">
					<Tool
						info={a}
					/>
				</div>
			)}
		/>;
	}

	hasTools(category) {
		if (this.state.objectCount?.taxonomy?.[category]) {
			return Object.values(this.state.objectCount.taxonomy[category])
				.filter((v) => v > 0)
				.length > 0;
		}

		return false;
	}

	getStandardTaxonomyValueId() {
		return this.props.taxonomies?.taxonomy_values
			.filter((v) => v.category === "TOOL CATEGORY" && v.name === "STANDARD")
			.map((v) => v.id);
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
			<div id="PageStandards">
				<div className="top-content">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-12">
								<Breadcrumb>
									<Breadcrumb.Item>RESOURCES & SUPPORT</Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/standards">Standards</Link></Breadcrumb.Item>
								</Breadcrumb>
							</div>

							<div className="col-md-12">
								<div className="text-content">
									<div className="h8 blue-text uppercase">Standards</div>
								</div>
							</div>

							<div className="col-md-5">
								<div className="text-content">
									<h4>Text to be defined</h4>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<p>Text to be defined.</p>

								<p>Text to be defined.</p>
							</div>
						</div>
					</div>
				</div>

				<div className="max-sized-section">
					<div className="list-content">
						<div className="row">
							<div className="col-md-8">
								<div className="vertically-centered">
									<h6>Standards</h6>
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
							<div className="col-md-12">
								<span className="h8">Standards</span>

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
