import React from "react";
import "./PageTool.css";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import { Helmet } from "react-helmet";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../../../utils/request.jsx";
import { getApiURL } from "../../../utils/env.jsx";
import Loading from "../../box/Loading.jsx";
import Chip from "../../form/Chip.jsx";
import { getContentFromBlock } from "../../../utils/article.jsx";

export default class PageTool extends React.Component {
	constructor(props) {
		super(props);

		this.getArticleContent = this.getArticleContent.bind(this);

		this.state = {
			article: null,
			articleLoading: false,
		};
	}

	componentDidMount() {
		this.getArticleContent();
	}

	getArticleContent() {
		this.setState({
			article: null,
			articleLoading: true,
		});

		getRequest.call(this, "public/get_public_article_content/" + this.props.match.params.handle, (data) => {
			this.setState({
				article: data,
				articleLoading: false,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"PageTool page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							{this.state.article !== null && !this.state.loading
								? <Breadcrumb.Item>
									<Link to={"/tool/" + this.props.match.params.handle}>
										{this.state.article.title}
									</Link>
								</Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.article !== null
					&& this.state.article.content !== undefined
					&& !this.state.articleLoading
					? <div className="row row-spaced">
						<div className={"col-md-12"}>
							<article>
								<Helmet>
									<meta prefix="og: http://ogp.me/ns#" property="og:title" content={this.state.article.title}/>
									<meta prefix="og: http://ogp.me/ns#" property="og:description" content={this.state.article.abstract}/>
									<meta prefix="og: http://ogp.me/ns#" property="og:image" content={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
									<meta prefix="og: http://ogp.me/ns#" property="og:url" content={this.state.article.link !== undefined
										&& this.state.article.link !== null
										&& this.state.article.link.length > 0
										? this.state.article.link
										: window.location.origin + "/tool/"
											+ this.props.match.params.handle}/>
									<meta name="twitter:card" content="summary_large_image"/>
								</Helmet>

								<div className="PageTool-tags">
									{this.state.article.taxonomy_tags.map((t) => (
										<Chip
											key={t.name}
											label={t.name}
											url={"/search?taxonomy_values=" + t.id}
										/>
									))}
								</div>

								<h1 className="showFulltext">
									{this.state.article.title}
								</h1>

								{this.state.article.abstract !== null
									&& <div
										className="PageTool-abstract"
										dangerouslySetInnerHTML={{
											__html:
											dompurify.sanitize(this.state.article.abstract),
										}}>
									</div>
								}

								{this.state.article.content.map((b) => (
									getContentFromBlock(b)
								))}

								{this.state.article.link !== null
									&& this.state.article.link !== undefined
									&& this.state.article.link.length > 0
									&& <div className="PageTool-external-link">
										<button
											onClick={() => window.open(this.state.article.link)}
										>
											<i className="fas fa-arrow-alt-circle-right"/> Go to the official source
										</button>
									</div>
								}
							</article>
						</div>
					</div>
					: <Loading
						height={200}
					/>
				}
			</div>
		);
	}
}
