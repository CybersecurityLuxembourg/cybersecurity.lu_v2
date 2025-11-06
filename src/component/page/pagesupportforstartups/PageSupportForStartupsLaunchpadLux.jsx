import React from "react";
import "./PageSupportForStartupsLaunchpadLux.css";

export default class PageSupportForStartupsLaunchpadLux extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageSupportForStartupsLaunchpadLux">
				<div className="row spaced-row">
					<div className="col-md-4 offset-md-2">
						<a
							aria-label={"Go to: \"Startup Luxembourg\""}
							href={"https://www.startupluxembourg.com/why-luxembourg/at-a-glance"}
							target="_blank"
							rel="noreferrer"
							className="card-link"
						>
							<div className="box vertically-centered centered ">
								<div className="row">
									<div className="col-md-6 offset-md-3 spaced-row">
										<i className="fas fa-mountain"/>
									</div>

									<div className="col-md-8 offset-md-2">
										<div className="h8 spaced-row">
									A thriving startups community
										</div>
									</div>

									<div className="col-md-12 text-primary" style={{ textDecoration: "underline" }}>
									Startup Luxembourg
										<i
											className="fa fa-up-right-from-square"
											style={{ fontSize: "1em", marginLeft: "0.5em", color: "inherit" }}
										/>
									</div>
								</div>
							</div>
						</a>
					</div>

					<div className="col-md-4">
						<a
							aria-label={"Go to: \"Luxembourg Trade and Invest\""}
							href={"https://luxembourgtradeandinvest.com/choose-luxembourg/explore-luxembourg-as-your-next-business-destination"}
							target="_blank"
							rel="noreferrer"
							className="card-link"
						>
							<div className="box vertically-centered centered">
								<div className="row">
									<div className="col-md-6 offset-md-3 spaced-row">
										<i className="fas fa-tasks"/>
									</div>

									<div className="col-md-8 offset-md-2">
										<div className="h8 spaced-row">
									10 good reasons to choose Luxembourg
										</div>
									</div>

									<div className="col-md-12 text-primary" style={{ textDecoration: "underline" }}>
										Luxembourg Trade and Invest
										<i
											className="fa fa-up-right-from-square"
											style={{ fontSize: "1em", marginLeft: "0.5em", color: "inherit" }}
										/>
									</div>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		);
	}
}
