import React from "react";
import "./PageAbout.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default class PageAbout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageAbout">
				<div className="top-content">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-12">
								<Breadcrumb>
									<Breadcrumb.Item>About us</Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/about">The initiative</Link></Breadcrumb.Item>
								</Breadcrumb>
							</div>

							<div className="col-md-6">
								<div className="text-content">
									<div className="blue-title">The initiative</div>

									<h4>The National Cybersecurity Portal</h4>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<img
									className={"logo"}
									src="/img/ecosystem-logo.jpg"
									alt="Skyline Luxembourg"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="max-sized-section">
					<div className="row">
						<div className="col-md-3">
							The national cybersecurity portal
						</div>

						<div className="col-md-1"/>

						<div className="col-md-8">
							<div className="row">
								<div className="col-md-12">
									<h5>A FOREWORD FROM MR FRANZ FAYOT, MINISTER
									OF THE ECONOMY</h5>
								</div>

								<div className="col-md-6">
									<p>We are on the eve of creating ultra-connected
									human societies, based increasingly on mobile
									technologies, the growing use of cloud computing
									solutions and the continued development of the
									Internet of Things. While welcoming new opportunities, we
									also expose ourselves to multiple new risks, with an
									augmented dependency on the availability and reliability
									of data.</p>
								</div>

								<div className="col-md-6">

								</div>

								<div className="col-md-12">
									<div className="quote">
										<p>“In order to achieve an inclusive, flourishing and
										trusted digital economy, the Ministry of the Economy especially
										promotes best practices among businesses and the implementation of
										informed governance via a collaborative risk management approach.”</p>

										<p>- Mr Franz Fayot, Minister of the Economy</p>
									</div>

									<p>This phenomenon highlights the increasingly transversal responsibility
									of policy and decision-makers and the growing importance of businesses
									and citizens called to take part in shaping tomorrows society. The digital
									transition requests each of us to grow into a more accountable and informed
									user of technology.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
