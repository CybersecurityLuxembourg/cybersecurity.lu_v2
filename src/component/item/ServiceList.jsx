import React from "react";
import "./ServiceList.css";
import dompurify from "dompurify";
import Dialog from "../dialog/Dialog.jsx";
import ArticleContent from "../content/ArticleContent.jsx";

/**
 * A React component that renders a list of services.
 * Each service is displayed with its title, abstract content, and either a link to a website
 * or details of the service that open in a modal dialog.
 *
 * @param {Array} services - An array of service objects. Each object should contain:
 *   - {string} id - A unique identifier for the service.
 *   - {string} title - The title of the service.
 *   - {string} abstract - A brief description or abstract content of the service.
 *   - {string} [link] - Optional. A URL to an external website related to the service.
 *   - {string} handle - Used as an identifier for detailed views or modal dialogs.
 */

export default class ServiceList extends React.Component {
	render() {
		const { services } = this.props;

		console.log(services);

		return <div id="ServiceList">
			{services.map((item, index) => (
				<React.Fragment key={`service_${item.id}`}>
					<div className="item">
						<div className="header">
							{item.title}
						</div>
						<div className="row">
							<div className="col-md-12">
								<div dangerouslySetInnerHTML={{
									__html:
									dompurify.sanitize(item.abstract),
								}} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								{item.link && item.link.length > 0
									? <a href={item.link} target={"_blank"} rel="noreferrer" className="link">
									Visit website<i className="fa fa-up-right-from-square"/>
									</a>
									: <Dialog trigger={<div className="link" role={"link"} tabIndex={0}>
										View service<i className="fa fa-window-restore"/>
									</div>} content={<ArticleContent id={item.handle} article={item} />}/>
								}
							</div>
						</div>
					</div>
					{index + 1 < services.length && <hr />}
				</React.Fragment>
			))}
		</div>;
	}
}
