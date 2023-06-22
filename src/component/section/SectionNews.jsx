import React from "react";
import "./SectionNews.css";
import { NotificationManager as nm } from "react-notifications";
import Tab from "../tab/Tab.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";
import News from "../item/News.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import DynamicTable from "../table/DynamicTable.jsx";

export default class SectionNews extends React.Component {
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

	fetchNews(page) {
		if (this.props.taxonomies && this.props.taxonomies.taxonomy_values) {
			this.setState({ news: null }, () => {
				const params = {
					type: "NEWS",
					include_tags: "true",
					taxonomy_values: ["INSTITUTIONAL NEWS", "TECH CORNER", "CALL TO ACTION"]
						.indexOf(this.state.selectedMenu) >= 0
						? this.props.taxonomies.taxonomy_values
							.filter((v) => v.category === "ARTICLE CATEGORY")
							.filter((v) => v.name.startsWith(this.state.selectedMenu))
							.map((v) => v.id)[0]
						: undefined,
					is_created_by_admin: this.state.selectedMenu === "MEMBER NEWS"
						? "false"
						: undefined,
					per_page: this.props.numberOfArticles || 9,
					page: page || 1,
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
					<DynamicTable
						items={this.state.news.items}
						pagination={this.state.news.pagination}
						changePage={(page) => this.fetchNews(page)}
						buildElement={(s) => <div
							className="col-md-4"
							key={s.id}>
							<News
								info={s}
							/>
						</div>
						}
						hidePagination={this.props.hidePagination}
					/>
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
					keys={this.state.newsCategories}
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
