import React from "react";
import "./PageNews.css";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import { Helmet } from "react-helmet";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../../../utils/request.jsx";
import { getApiURL } from "../../../utils/env.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";
import News from "../../item/News.jsx";
import {
	getContentFromBlock,
	buildCarousel,
	getNextNonImagePosition,
} from "../../../utils/article.jsx";
import { dateToString } from "../../../utils/date.jsx";
import TwitterLink from "../../form/TwitterLink.jsx";
import LinkedInLink from "../../form/LinkedInLink.jsx";

export default class PageNews extends React.Component {
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
		this.getArticleContent();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.handle !== this.props.match.params.handle) {
			this.componentDidMount();
		}
	}

	getArticleContent() {
		this.setState({
			article: null,
			articleEntities: null,
			relatedArticles: null,
			relatedArticleEntities: null,
			articleLoading: false,
			relatedArticleLoading: false,
		});

		getRequest.call(this, "public/get_public_article_content/" + this.props.match.params.handle, (data) => {
			this.setState({
				article: data,
				articleLoading: false,
			});

			getRequest.call(this, "public/get_public_related_articles/" + this.props.match.params.handle + "?include_tags=true", (data2) => {
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

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		let positionToTreat = 0;

		return (
			<div className={"PageNews"}>
				<div className={"max-sized-section"}>
					<div className="row">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item><Link to="/news">NEWS & EVENTS</Link></Breadcrumb.Item>
								<Breadcrumb.Item><Link to="/news">NEWS</Link></Breadcrumb.Item>
								{this.state.article !== null && !this.state.loading
									? <Breadcrumb.Item>
										<Link to={"/news/" + this.props.match.params.handle}>
											{this.state.article.title}
										</Link>
									</Breadcrumb.Item>
									: ""}
							</Breadcrumb>
						</div>
					</div>

					{this.state.article !== null && this.state.article.content !== undefined
						&& !this.state.articleLoading
						? <div className="row row-spaced">
							<div className={"col-md-7"}>
								<article>
									<Helmet>
										<meta name="title" property="og:title" content={this.state.article.title}/>
										<meta name="description" property="og:description" content={this.state.article.abstract}/>
										<meta name="image" property="og:image" content={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
										<meta name="url" property="og:url" content={this.state.article.link !== undefined
											&& this.state.article.link !== null
											&& this.state.article.link.length > 0
											? this.state.article.link
											: window.location.origin + "/news/"
												+ this.props.match.params.handle}/>
									</Helmet>

									<h3>
										{this.state.article.title}
									</h3>

									<div className='cover'>
										{this.state.article.image !== null
											? <img src={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
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
								</article>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-4 side-info">
								<div className="row">
									<div className="col-md-12">
										<div className="h8 blue-text">Share the news</div>
									</div>

									<div className="col-md-12">
										<div className="social-media-links">
											<TwitterLink
												article={this.state.article}
											/>
											<LinkedInLink
												article={this.state.article}
											/>
										</div>
									</div>
								</div>

								<div className="grey-horizontal-bar"/>

								<div className="row">
									<div className="col-md-12">
										<div className="h8 blue-text">Subscribe to our newsletter</div>
									</div>

									<div className="col-md-12">
										<p>Keep up to date with the latest cybersecurity news in and
										around Luxembourg: from institutional news, to the tech corner
										and upcoming events, find a review of all the newest developments
										in one place and remain a step ahead of what&apos;s coming next.</p>

										<button
											onClick={() => window.open(
												"https://newsletter.cybersecurity-luxembourg.com",
												"_blank",
											)}>
											Subscribe to our Newletter &nbsp;<i className="fas fa-paper-plane"/>
										</button>
									</div>
								</div>

								<div className="grey-horizontal-bar"/>

								<div className="row">
									<div className="col-md-12">
										<div className="h8 blue-text">Related news</div>
									</div>

									{this.state.relatedArticles !== null && !this.state.relatedArticleLoading
										&& this.state.relatedArticles.length > 0
										&& this.state.relatedArticles.map((a) => (
											<div
												className="col-md-12"
												key={a.id}>
												<News
													key={a.id}
													info={a}
													entities={this.state.relatedArticleEntities}
												/>
											</div>
										))
									}

									{this.state.relatedArticles !== null && !this.state.relatedArticleLoading
										&& this.state.relatedArticles.length === 0
										&& <div className="col-md-12">
											<Message
												text={"No related news found"}
												height={200}
											/>
										</div>
									}

									{(this.state.relatedArticles === null || this.state.relatedArticleLoading)
										&& <div className="col-md-12">
											<Loading
												height={200}
											/>
										</div>
									}
								</div>
							</div>
						</div>
						: <Loading
							height={200}
						/>
					}
				</div>
			</div>
		);
	}
}
