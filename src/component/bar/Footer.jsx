import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="Footer">
				<div className="content">
					<div className="row">
						<div className="col-md-3">
							<img
								className={"logo"}
								src="/img/ecosystem-logo.jpg"
								alt="CYBERLUX Logo"
							/>

							<div className="row">
								<div className="col-md-12">
									<div className="patronage">
										Under the High Patronage of the Ministry of the Economy
									</div>
									<div className="key-partners">
										<b>Key partners:</b>
									</div>
									<div className="partner-link">
										<a href="https://hcpn.gouvernement.lu/" target="_blank" rel="noreferrer">
											High Commission for National Protection
										</a>
									</div>
									<div className="partner-link">
										<a href="https://lhc.lu/" target="_blank" rel="noreferrer">
											Luxembourg House of Cybersecurity
										</a>
									</div>
									<div className="partner-link">
										<a href="https://www.luxinnovation.lu/" target="_blank" rel="noreferrer">
											Luxinnovation
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-2">
							<div className="title">Your portal</div>

							<div className="link">
								<Link to="/">
									The Ecosystem
								</Link>
							</div>
							<div className="link">
								<Link to="/">
									News & Events
								</Link>
							</div>
							<div className="link">
								<Link to="/">
									Skills & Jobs
								</Link>
							</div>
							<div className="link">
								<Link to="/">
									Resources & Support
								</Link>
							</div>
							<div className="link">
								<Link to="/about">
									About us
								</Link>
							</div>
							<div className="link">
								<Link to="/contact">
									Contact
								</Link>
							</div>
						</div>

						<div className="col-md-3">
							<div className="title">Tools</div>

							<div className="link">
								<Link to="/dashboard">
									Dashboard
								</Link>
							</div>
							<div className="link">
								<Link to="/help">
									How can we help?
								</Link>
							</div>
							<div className="link">
								<Link to="/support">
									Immediate support
								</Link>
							</div>
						</div>

						<div className="col-md-3">
							<div className="title">Stay informed</div>

							<div className="social-network">
								<a
									href="https://twitter.com/cyberluxembourg"
									rel="noreferrer"
									target="_blank"
									title="Twitter CYBERLUX"
									className="text-capitalize">
									<i className="fab fa-twitter Footer-network"/>
								</a>
								<a
									href="https://www.linkedin.com/company/cybersecurity-luxembourg/"
									rel="noreferrer"
									target="_blank"
									title="LinkedIn CYBERLUX"
									className="text-capitalize">
									<i className="fab fa-linkedin-in Footer-network"/>
								</a>
							</div>

							<button
								onClick={() => window.open(
									"https://newsletter.cybersecurity-luxembourg.com",
									"_blank",
								)}
							>
								Subscribe to our Newsletter &nbsp;<i className="fas fa-paper-plane"/>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
