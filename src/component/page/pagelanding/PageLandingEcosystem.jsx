import React from "react";
import "./PageLandingEcosystem.css";
import BoxCount from "../../box/BoxCount.jsx";
import { getPrivateAppURL } from "../../../utils/env.jsx";

export default class PageLandingEcosystem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div id={"PageLandingEcosystem"}>
				<div className="content max-sized-section">
					<div className="row">
						<div className="col-md-5">
							<h3>
								Join the ecosystem to secure Luxembourg’s digital future
							</h3>

							<div className="catch-phrase">
								Become an active member of the ecosystem and gain great
								visibility! Throughout the year, a wide set of actions
								is organised by the ecosystem for the ecosystem.
							</div>

							<button
								onClick={() => window.open(
									getPrivateAppURL(),
									"_blank",
								)}>
								Join the ecosystem
							</button>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-3">
							<BoxCount
								image="oui.png"
								label="Total actors"
								count="328"
							/>
							<BoxCount
								image="oui.png"
								label="Total public institutions"
								count="328"
							/>
						</div>

						<div className="col-md-3">
							<BoxCount
								image="oui.png"
								label="Total companies"
								count="318"
							/>
							<BoxCount
								image="oui.png"
								label="Total startups"
								count="73"
							/>
						</div>
					</div>
				</div>
				{this.state.ee}
			</div>
		);
	}
}
