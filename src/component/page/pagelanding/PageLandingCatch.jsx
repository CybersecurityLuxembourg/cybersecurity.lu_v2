import React from "react";
import "./PageLandingCatch.css";

export default class PageLandingCatch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div id={"PageLandingCatch"}>
				<div className="content max-sized-section">
					<div className="row">
						<div className="col-md-7">
							<h3>
								For a secure digital society
							</h3>

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

				<div className="alerts max-sized-section">
					<div className="alert-box">
						{this.state.ee}
					</div>
				</div>
			</div>
		);
	}
}
