import React from "react";
import "./SectionNews.css";
import { NotificationManager as nm } from "react-notifications";
import Tab from "../tab/Tab.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";
import News from "../item/News.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";

export default class SectionNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
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
					per_page: this.props.numberOfArticles || 9,
					page: this.state.page,
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
					<div className="col-md-12">
						showPagination TODO
					</div>
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
			<div className={"SectionNews"}>
				<Tab
					onMenuClick={(m) => this.onMenuClick(m)}
					selectedMenu={this.state.selectedMenu}
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
		);
	}
}
