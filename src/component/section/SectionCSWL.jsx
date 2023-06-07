import React from "react";
import "./SectionCSWL.css";

export default class SectionCSWL extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"SectionCSWL"}>
				<div className="max-sized-section">
					<div className="content">
						<div className="row">
							<div className="col-md-6">
								<div className="text-content">
									<div>
										<h4>CSWL 2023 is coming soon!</h4>

										<div className="catch-phrase">
											In this edition of Lëtz Talk about Cyber, Melanie
											Delannoy, CyberSec Enthusiast received Björn Ottersten, Director
											of the Interdisciplinary Centre for Security, Reliability and Trust (SnT).
										</div>

										<button
											className="link"
											onClick={() => window.open(
												"https://cswl.lu",
												"_blank",
											)}
										>
											See more information
										</button>
									</div>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<img
									src="/img/cybersecurity-ecso-taxonomy.png"
									alt="CSWL 2023"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
