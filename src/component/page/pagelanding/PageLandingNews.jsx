import React from "react";
import "./PageLandingNews.css";
import { NotificationManager as nm } from "react-notifications";
import Tab from "../../tab/Tab.jsx";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import News from "../../item/News.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";

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
			news: undefined,
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
		}
	}

	buildNewsContent() {
		if (this.state.news
			&& this.state.news.pagination
			&& this.state.news.pagination.total) {
			if (this.state.news.pagination.total > 0) {
				return <div className="row">
					<div className="col-md-4">
						{this.state.news.items.map((i) => (
							<News key={i.id} info={i}/>
						))}
					</div>
				</div>;
			}

			return <Message
				height={500}
				content="No news found"
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
						<div className="row">
							<div className="col-md-12">
								<h4>Latest news from the community</h4>

								<p className="catch-phrase">
									Lorem ipsum dolor sit amet consectetur. Et ornare
									posuere quisque morbi egestas convallis. Adipiscing
									non enim aliquet
								</p>

								<button>Share your latest news</button>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								{this.state.ee}
							</div>
						</div>
					</div>
				</div>

				<div className="articles max-sized-section">
					<Tab
						onMenuClick={(m) => this.onMenuClick(m)}
						selectedMenu={this.selectedMenu}
						labels={this.state.newsCategories}
						keys={[0, 1, 2, 3, 4]}
						content={[
							this.buildNewsContent(),
							this.buildNewsContent(),
							this.buildNewsContent(),
							this.buildNewsContent(),
							this.buildNewsContent(),
						]}
					/>
				</div>
			</div>
		);
	}
}
