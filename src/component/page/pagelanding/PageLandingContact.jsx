import React from "react";
import "./PageLandingEcosystem.css";

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
						<div className="col-md-7">
							<div className="title">
								For a secure digital society
							</div>

							<div className="catch-phrase">
								The national cybersecurity portal for everyone. All
								in one place, join our community-driven platform
								that empowers your to stay ahead of the digital economy
							</div>
						</div>

						<div className="col-md-3">
							<button>The Ecosystem</button>
							<button className="white">How can we help?</button>
						</div>
					</div>
				</div>

				<div className="skyline">
					<img
						className={"logo"}
						src="/img/skyline.png"
						alt="Skyline Luxembourg"
					/>
				</div>
				{this.state.ee}
			</div>
		);
	}
}
