import React from "react";
import "./PageSupportForStartupsLaunchpadLux.css";

export default class PageSupportForStartupsLaunchpadLux extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageSupportForStartupsLaunchpadLux">
				<div className="row spaced-row">
					<div className="col-md-4 offset-md-2">
						<div className="box vertically-centered centered">
							<div className="row">
								<div className="col-md-6 offset-md-3 spaced-row">
									<i className="fas fa-mountain"/>
								</div>

								<div className="col-md-8 offset-md-2">
									<div className="h8 spaced-row">
										A thriving startups community
									</div>
								</div>

								<div className="col-md-12">
									<button
										className="small"
										onClick={() => window.open(
											"https://www.startupluxembourg.com/why-luxembourg/at-a-glance",
											"_blank",
										)}>
										Startup Luxembourg
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-4">
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

								<div className="col-md-12">
									<button
										className="small"
										onClick={() => window.open(
											"https://www.luxinnovation.lu/wp-content/uploads/sites/3/2022/10/10-good-reasons-july-2022-web-en-ti.pdf",
											"_blank",
										)}>
										Download the brochure
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
