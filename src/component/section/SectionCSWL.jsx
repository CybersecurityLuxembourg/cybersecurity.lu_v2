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
							<div className="col-md-6 spaced-row">
								<div className="text-content">
									<div>
										<h4>CYBERSECURITY WEEK LUXEMBOURG 2023</h4>

										<div className="catch-phrase">
											Because joint efforts have greater resonance, the CSWL
											campaign aims to bring together and federate the cybersecurity
											community, on the one hand, and to promote the hard work being
											done by that same community to achieve a common goal of cyber
											resilience, on the other hand.
										</div>

										<button
											className="link"
											onClick={() => window.open(
												"https://cswl.lu",
												"_blank",
											)}
										>
											Discover the full programme &nbsp;<i className="fas fa-arrow-right"/>
										</button>
									</div>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5 flex-fill my-auto">
								<img
									src="/img/cswl-main.png"
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
