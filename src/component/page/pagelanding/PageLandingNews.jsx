import React from "react";
import "./PageLandingNews.css";
import Tab from "../../tab/Tab.jsx";

export default class PageLandingNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: "1",
		};
	}

	onMenuClick() {
		return this.state.ee;
	}

	render() {
		return (
			<div id={"PageLandingNews"}>
				<div className="content">
					<div className="sma-sized-section">
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

				<div className="articles max-sized-section">
					<Tab
						onMenuClick={this.onMenuClick}
						selectedMenu={this.state.selectedMenu}
						labels={[
							"All news",
							"Member news",
							"Institutional news",
							"The tech corner",
							"Call to action",
						]}
						keys={["1", "2", "3", "4", "5"]}
						content={[
							null,
							null,
							null,
							null,
							null,
						]}
					/>
				</div>
			</div>
		);
	}
}
