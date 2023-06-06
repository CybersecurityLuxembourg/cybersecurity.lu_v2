import React from "react";
import "./PageLatestNews.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import SectionNews from "../section/SectionNews.jsx";

export default class PageLatestNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div id={"PageLatestNews"}>
				<div className="max-sized-section">
					<div className={"top-content"}>
						<div className="row">
							<div className="col-md-7">
								<Breadcrumb>
									<Breadcrumb.Item><Link to="/">News & Events</Link></Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/news">News</Link></Breadcrumb.Item>
								</Breadcrumb>

								<h4>Latest news from the community</h4>

								<p>
									The latest cybersecurity ecosystem
									news, interviews, technologies, and resources.
								</p>

								<button>
									Share your latest news
								</button>
								<button className="link small">
									Subscribe to the newsletter
								</button>
							</div>

							<div className="col-md-5">
								dd
							</div>
						</div>
					</div>

					<div className={"news-content"}>
						<div className="row">
							<div className="col-md-12">
								<SectionNews
									taxonomies={this.props.taxonomies}
									numberOfArticle={9}
									showPagination={true}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
