import React from "react";
import "./PageLandingNewsletter.css";

export default class PageLandingNewsletter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div id={"PageLandingNewsletter"}>
				<div className="content">
					<div className="mid-sized-section">
						<div className="row">
							<div className="col-md-12">
								<h4>Latest news from the community</h4>

								<div className="catch-phrase">
									Lorem ipsum dolor sit amet consectetur. Et ornare
									posuere quisque morbi egestas convallis. Adipiscing
									non enim aliquet
								</div>

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
			</div>
		);
	}
}
