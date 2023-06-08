import React from "react";
import "./PageDashboardPrivateSector.css";

export default class PageDashboardPrivateSector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageDashboardPrivateSector"}>
				<div className="mid-sized-section">
					<div className="content">
						<div className="row">
							<div className="col-md-7">
								<h4>Don’t miss our latest news!</h4>

								<div className="catch-phrase">
									Keep up to date with the latest cybersecurity news
									in and around Luxembourg: from institutional news, to
									the tech corner and upcoming events, find a review of
									all the newest developments in one place and remain a
									step ahead of what’s coming next.
								</div>
							</div>

							<div className="col-md-5">
								<button>Subscribe to our newsletter</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
