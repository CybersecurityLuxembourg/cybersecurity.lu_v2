import React from "react";
import "./ArticleContent.css";
import { Helmet } from "react-helmet";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import { getApiURL } from "../../utils/env.jsx";
import { buildCarousel, getContentFromBlock, getNextNonImagePosition } from "../../utils/article.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";
import Loading from "../box/Loading.jsx";

/**
 * A React component responsible for displaying the content of an article.
 *
 * The component fetches the main article and related articles based on the provided article handle.
 * Once the article data is fetched, it renders the article's title, cover image, publication date,
 * abstract, and content blocks.
 *
 * @property {string} handle - The 'handle' identifier for the article.
 * @property {Object} [article] - Optional preloaded article data.
 *
 */

export default class ArticleContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			article: props.article || null,
			articleEntities: null,
			relatedArticles: null,
			relatedArticleEntities: null,
			articleLoading: false,
			relatedArticleLoading: false,
			isLoading: true,
		};

		this.loadContent = this.loadContent.bind(this);
	}

	componentDidMount() {
		this.loadContent(this.props.handle);
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

	async loadContent(handle) {
		this.setState({ isLoading: true });

		try {
			const [article, relatedArticles] = await Promise.all([
				this.queryData(`public/get_public_article_content/${handle}`),
				this.queryData(`public/get_public_related_articles/${handle}`, { include_tags: true }),
			]);

			this.setState({ article, relatedArticles });

			const ids = relatedArticles.flatMap((relatedArticle) => relatedArticle.entity_tags);

			if (ids.length > 0) {
				const relatedArticleEntities = await this.queryData("public/get_public_entities", { ids });
				this.setState({ relatedArticleEntities });
			}
		} catch (error) {
			nm.warning(`Failed to load article data: ${error.message}`);
		}

		this.setState({ isLoading: false });
	}

	render() {
		let positionToTreat = 0;

		if (this.state.isLoading) {
			return (
				<div className="ArticleContent">
					<div className="loading-container"><Loading /></div>
				</div>
			);
		}

		return (
			<div className={"ArticleContent"}>
				{this.state.article ? <article>
					<Helmet>
						<meta name="title" property="og:title" content={this.state.article.title}/>
						<meta name="description" property="og:description" content={this.state.article.abstract}/>
						<meta name="image" property="og:image" content={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
					</Helmet>

					<h4 className="title">
						{this.state.article.title}
					</h4>

					<div className='cover'>
						{this.state.article.image !== null
							? <img src={getApiURL() + "public/get_public_image/" + this.props.article.image}/>
							: ""}
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

					{this.state.article.content?.length > 0 && <div className="content">
						{this.state.article.content?.map((b, i) => {
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
					</div>}

				</article> : <div className="loading-container"><p>Article not found</p></div>
				}
			</div>
		);
	}
}
