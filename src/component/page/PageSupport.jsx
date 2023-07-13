import React from "react";
import "./PageSupport.css";

export default class PageSupport extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageSupport"}>
				<div className="max-sized-section">
					<div className="row">
						<div className="col-md-12">
							<div className="immediate-support">
								<div className="row">
									<div className="col-md-12">
										<h2>Immediate support</h2>
									</div>

									<div className="offset-md-2 col-md-8">
										<p>Either you need help, seek guidance or wish
										to discuss a cybersecurity related topic/project, relevant
										experts are there for you.</p>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-12">
							<div className="report">
								<div className="row">
									<div className="col-md-1"/>

									<div className="col-md-5">
										<h4>Report an incident!</h4>

										<p>Incidents can be reported via e-mail or phone. See
										our contact page for details including OpenPGP
										information.</p>

										<button
											className="link"
											onClick={() => window.open(
												"https://circl.lu",
												"_blank",
											)}>
											Report an incident &nbsp;<i className="fas fa-arrow-right"/>
										</button>
									</div>

									<div className="col-md-1"/>

									<div className="col-md-3">
										<div className="report-img">
											<img
												src="/img/circl-logo-full-text.png"
												alt="CIRCL Logo"
											/>
										</div>
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
