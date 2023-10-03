import React from "react";
import "./PageSupportForStartupsNews.css";
import { NotificationManager as nm } from "react-notifications";
import { getUrlParameter, dictToURI } from "../../../utils/url.jsx";
import { getRequest } from "../../../utils/request.jsx";
import News from "../../item/News.jsx";
import Count from "../../form/Count.jsx";
import Field from "../../form/Field.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";
import DynamicTable from "../../table/DynamicTable.jsx";

export default class PageSupportForStartupsNews extends React.Component {
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
					type: "NEWS",
					page: page || 1,
					per_page: 3,
					include_tags: true,
					name: this.state.filters.title,
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
				<div className="col-md-4">
					<News
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
			if (this.state
				.objectCount?.taxonomy?.[legalCategories[i].category]?.[legalCategories[i].name] > 0) {
				result.push(
					<div className="filter-row">
						<Field
							className="checkbox-category"
							type="checkbox"
							checkBoxLabel={legalCategories[i].name}
							value={this.state.filters.taxonomy_values.indexOf(legalCategories[i].id) >= 0}
							onChange={(v) => this.modifyFilters(
								"taxonomy_values",
								v
									? this.state.filters.taxonomy_values.concat([legalCategories[i].id])
									: this.state.filters.taxonomy_values.filter((o) => o !== legalCategories[i].id),
							)}
							hideLabel={true}
						/>
						<Count
							count={
								this.state.objectCount
									.taxonomy[legalCategories[i].category][legalCategories[i].name]
							}
						/>
					</div>,
				);
			}
		}

		return result;
	}

	getStandardTaxonomyValueId() {
		return this.props.taxonomies?.taxonomy_values
			.filter((v) => v.category === "ARTICLE CATEGORY" && v.name === "STARTUP CORNER")
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
			<div id="PageSupportForStartupsNews">
				<div className="max-sized-section">
					<div className="list-content">
						<div className="row">
							<div className="col-md-12 centered spaced-row">
								<h4>Startup news</h4>
							</div>

							<div className="col-md-12">
								<span className="h8">News</span>

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
