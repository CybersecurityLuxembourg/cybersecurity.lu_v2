import React from "react";
import "./ServiceList.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";

export default class ServiceList extends React.Component {
	getArticleContent() {
		return this.props.services;
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		const articles = this.getArticleContent();

		return <div id="ServiceList">
			{articles.map((item, index) => (
				<>
					<div className="item" key={index}>
						<div className="header">
							{item.title}
						</div>
						<div className="row">
							<div className="col-md-12">
								<div key={index} dangerouslySetInnerHTML={{
									__html:
									dompurify.sanitize(item.abstract),
								}} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								{item.link && item.link.length > 0
									? <a href={item.link} target={"_blank"} rel="noreferrer" className="link">
									Read more &nbsp;<i className="fas fa-arrow-right"/>
									</a>
									: <Link to={`/service/${item.handle}`} className="link">
										Read more &nbsp;<i className="fas fa-arrow-right"/>
									</Link>
								}
							</div>
						</div>
					</div>
					{index + 1 < articles.length && <hr />}
				</>
			))}
		</div>;
	}
}
