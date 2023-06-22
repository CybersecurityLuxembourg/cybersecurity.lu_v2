import React from "react";
import "./PageLandingNews.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import News from "../../item/News.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";
import SectionNews from "../../section/SectionNews.jsx";
import { getPrivateAppURL } from "../../../utils/env.jsx";

export default class PageLandingNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: 0,
			newsCategories: [
				"ALL NEWS",
				"MEMBER NEWS",
				"INSTITUTIONAL NEWS",
				"TECH CORNER",
				"CALL TO ACTION",
			],
			news: null,
		};
	}

	componentDidMount() {
		this.fetchNews();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.fetchNews();
		}
	}

	fetchNews() {
		if (this.props.taxonomies && this.props.taxonomies.taxonomy_values) {
			this.setState({ news: null }, () => {
				const params = {
					type: "NEWS",
					include_tags: "true",
					taxonomy_values: this.state.selectedMenu >= 2
						? this.props.taxonomies.taxonomy_values
							.filter((v) => v.name === this.state.newsCategories[this.state.selectedMenu])
							.map((v) => v.id).join(",")
						: undefined,
					is_created_by_admin: this.state.selectedMenu === "MEMBER NEWS"
						? true
						: undefined,
					per_page: 6,
					page: 1,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						news: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			});
		}
	}

	buildNewsContent() {
		if (this.state.news
			&& this.state.news.pagination) {
			if (this.state.news.pagination.total > 0) {
				return <div className="row">
					{this.state.news.items.map((i) => (
						<div className="col-md-4" key={i.id}>
							<News info={i}/>
						</div>
					))}
				</div>;
			}

			return <Message
				height={500}
				text="No news found"
			/>;
		}

		return <Loading height={500}/>;
	}

	onMenuClick(menu) {
		this.setState({ selectedMenu: menu }, () => {
			this.fetchNews();
		});
	}

	render() {
		return (
			<div id={"PageLandingNews"}>
				<div className="content">
					<div className="sma-sized-section">
						<div className="row spaced-row">
							<div className="col-md-12">
								<h4>Latest news from the community</h4>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<button
									onClick={() => window.open(
										getPrivateAppURL(),
										"_blank",
									)}>
									Share your latest news
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="articles max-sized-section">
					<SectionNews
						taxonomies={this.props.taxonomies}
						numberOfArticles={6}
						hidePagination={true}
					/>
				</div>
			</div>
		);
	}
}
