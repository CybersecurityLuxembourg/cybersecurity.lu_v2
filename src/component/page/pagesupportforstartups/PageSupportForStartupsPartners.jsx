import React from "react";
import "./PageSupportForStartupsPartners.css";

export default class PageSupportForStartupsPartners extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageSupportForStartupsPartners">
				<div className="max-sized-section">
					<div className="row">
						<div className="col-md-6">
							<div className="title">
								<h6>Your trusted partners to launch your cyber business at a glance</h6>
							</div>
						</div>

						<div className="col-md-6">
							<a href="https://www.lhc.lu/" target="_blank" rel="noreferrer">
								<div className="box vertically-centered centered">
									<div className="row">
										<div className="col-md-6 offset-md-3">
											<img
												className="spaced-row"
												src="/img/lhc-logo.png"
												alt="Logo LHC"
											/>
										</div>

										<div className="col-md-8 offset-md-2">
											<div className="h8">
												The gateway to develop your cyber business
											</div>
										</div>
									</div>
								</div>
							</a>
						</div>

						<div className="col-md-6">
							<a href="https://www.technoport.lu/" target="_blank" rel="noreferrer">
								<div className="box vertically-centered centered">
									<div className="row">
										<div className="col-md-6 offset-md-3">
											<img
												className="spaced-row"
												src="/img/logo-technoport.png"
												alt="Logo Technoport"
											/>
										</div>

										<div className="col-md-8 offset-md-2">
											<div className="h8">
												Startups onboarding
											</div>
										</div>
									</div>
								</div>
							</a>
						</div>

						<div className="col-md-6">
							<a href="https://www.startupluxembourg.com/fit-4-start" target="_blank" rel="noreferrer">
								<div className="box vertically-centered centered">
									<div className="row">
										<div className="col-md-6 offset-md-3">
											<img
												className="spaced-row"
												src="/img/luxinnovation-logo.jpg"
												alt="Logo Luxinnovation"
											/>
										</div>

										<div className="col-md-8 offset-md-2">
											<div className="h8">
												Startups selection & development support
											</div>
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
