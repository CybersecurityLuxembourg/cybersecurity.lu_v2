import React from "react";
import "./PageLandingCatch.css";

export default class PageLandingCatch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageLandingCatch"}>
				<div className="content max-sized-section">
					<div className="row">
						<div className="col-md-7">
							<div className="title">
								Access Luxembourg’s cybersecurity
								ecosystem, all in one place.
							</div>

							<p className="catch-phrase">
								The national cybersecurity portal for everyone. All
								in one place, join our community-driven platform
								that empowers your to stay ahead of the digital economy
							</p>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-3">
							<div className="buttons">
								<button
									onClick={() => this.props.history.push("ecosystem")}>
									The Ecosystem
								</button>
								<button
									className="white"
									onClick={() => this.props.history.push("support")}>
									How can we help?
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="skyline">
					<img
						className={"logo"}
						src="/img/Skyline.png"
						alt="Skyline Luxembourg"
					/>
				</div>

				{/* <div className="alerts-wrapper max-sized-section">
					<div className="alerts">
						<div className="alert-box">
							{this.state.ee}
						</div>
					</div>
				</div> */}
			</div>
		);
	}
}
