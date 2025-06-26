import React from "react";
import "./ArticleContent.css";
import { Helmet } from "react-helmet";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import { getApiURL } from "../../utils/env.jsx";
import { dateToString } from "../../utils/date.jsx";
import { buildCarousel, getContentFromBlock, getNextNonImagePosition } from "../../utils/article.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";

/**
 * A React component responsible for displaying the content of an article.
 *
 * The component fetches the main article and related articles based on the provided article ID.
 * It also handles loading states and errors during data fetching. Once the article data is fetched,
 * it renders the article's title, cover image, publication date, abstract, and content blocks.
 *
 * @extends React.Component
 */

export default class ArticleContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			article: null,
			articleEntities: null,
			relatedArticles: null,
			relatedArticleEntities: null,
			articleLoading: false,
			relatedArticleLoading: false,
		};
	}

	componentDidMount() {
		this.getArticleContent(this.props.id);
	}

	getArticleContent(id) {
		this.setState({
			article: null,
			articleEntities: null,
			relatedArticles: null,
			relatedArticleEntities: null,
			articleLoading: false,
			relatedArticleLoading: false,
		});

		getRequest.call(this, "public/get_public_article_content/" + id, (data) => {
			this.setState({
				article: data,
				articleLoading: false,
			});

			getRequest.call(this, "public/get_public_related_articles/" + id + "?include_tags=true", (data2) => {
				this.setState({
					relatedArticles: data2,
					relatedArticleLoading: false,
				}, () => {
					const params2 = {
						ids: Array.prototype.concat.apply(
							[],
							data2
								.filter((i) => i.entity_tags)
								.map((i) => i.entity_tags),
						),
					};

					if (params2.ids.length > 0) {
						getRequest.call(this, "public/get_public_entities?" + dictToURI(params2), (data3) => {
							this.setState({
								relatedArticleEntities: data3,
							});
						}, (response) => {
							nm.warning(response.statusText);
						}, (error) => {
							nm.error(error.message);
						});
					}
				});
			}, (response) => {
				this.setState({ loading: false });
				nm.warning(response.statusText);
			}, (error) => {
				this.setState({ loading: false });
				nm.error(error.message);
			});
		}, (response) => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, (error) => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	render() {
		let positionToTreat = 0;
		return (
			<div className={"ArticleContent"}>
				{this.state.article ? <article>
					<Helmet>
						<meta name="title" property="og:title" content={this.state.article.title}/>
						<meta name="description" property="og:description" content={this.state.article.abstract}/>
						<meta name="image" property="og:image" content={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
						<meta name="url" property="og:url" content={this.props.article.link !== undefined
					&& this.state.article.link !== null
					&& this.state.article.link.length > 0
							? this.state.article.link
							: window.location.origin + "/service/"
						+ this.props.id}/>
					</Helmet>

					<h3>
						{this.state.article.title}
					</h3>

					<div className='cover'>
						{this.state.article.image !== null
							? <img src={getApiURL() + "public/get_public_image/" + this.props.article.image}/>
							: ""}
					</div>

					<div className="publication-date">
						<div className="h8 blue-text">
						Published on
						</div>

						<div className="date">
							{dateToString(this.state.article.publication_date, "DD MMM YYYY")}
						</div>
					</div>

					{this.state.article.abstract
					&& <div
						className="abstract"
						dangerouslySetInnerHTML={{
							__html:
								dompurify.sanitize(this.state.article.abstract),
						}}>
					</div>
					}

					{this.state.article.content.map((b, i) => {
						if (positionToTreat <= i) {
							if (b.type === "IMAGE") {
								const nextNonImagePosition = getNextNonImagePosition(
									this.state.article.content,
									i,
								);

								const el = buildCarousel(
									this.state.article.content
										.slice(
											i,
											nextNonImagePosition,
										),
								);

								positionToTreat = nextNonImagePosition;

								return el;
							}

							positionToTreat += 1;
							return getContentFromBlock(b);
						}
						return null;
					})}
				</article> : null}
			</div>
		);
	}
}
