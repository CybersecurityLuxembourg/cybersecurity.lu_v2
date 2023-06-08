import React from "react";
import "./PageDashboardPrivateSector.css";
import BoxCount from "../../box/BoxCount.jsx";

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
				<div className="max-sized-section">
					<div className="content">
						<div className="row">
							<div className="col-md-6">
								<div className="title">
									<h2>Private Sector</h2>
								</div>
							</div>

							<div className="col-md-3">
								<BoxCount
									image={""}
									label={"ee"}
									count={12}
								/>
								<BoxCount
									image={""}
									label={"ee"}
									count={12}
								/>
							</div>

							<div className="col-md-3">
								<BoxCount
									image={""}
									label={"ee"}
									count={12}
								/>
								<BoxCount
									image={""}
									label={"ee"}
									count={12}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<h5>A closer look to the Ecosystem</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
