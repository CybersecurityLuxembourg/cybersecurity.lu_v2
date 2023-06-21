import React from "react";
import "./PageLandingLTAC.css";

export default class PageLandingLTAC extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageLandingLTAC"}>
				<div className="max-sized-section">
					<div className="content">
						<div className="row">
							<div className="col-md-5">
								<img
									src="/img/image-ltac.png"
									alt="CSWL 2023"
								/>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-6">
								<div className="vertically-centered">
									<div>
										<h4><span className="blue-text">#</span> LËTZ TALK ABOUT CYBER</h4>

										<p className="catch-phrase">
											In this edition of Lëtz Talk about Cyber, Melanie
											Delannoy, CyberSec Enthusiast received Björn
											Ottersten, Director of the Interdisciplinary Centre
											for Security, Reliability and Trust (SnT).
										</p>

										<button className="link">
											Listen to our podcast &nbsp;<i className="fas fa-arrow-right"/>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
