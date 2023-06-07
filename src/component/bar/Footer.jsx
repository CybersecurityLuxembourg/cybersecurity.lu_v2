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
						<div className="col-md-4">
							<img
								className={"logo"}
								src="/img/ecosystem-logo.jpg"
								alt="CYBERLUX Logo"
							/>

							<div className="row">
								<div className="col-md-12">
									<p className="patronage">
										Under the High Patronage of the Ministry of the Economy
									</p>
									<p>
										<b>Key partners</b>
									</p>
									<p>
										High Commission for National Protection
									</p>
									<p>
										Luxembourg House of Cybersecurity
									</p>
									<p>
										Luxinnovation
									</p>
								</div>
							</div>
						</div>

						<div className="col-md-2">
							<div className="title">Your portal</div>

							<Link to="/">
								Discover the Ecosystem
							</Link>
							<Link to="/">
								News & Events
							</Link>
							<Link to="/">
								Skills & Jobs
							</Link>
							<Link to="/">
								Resources & Support
							</Link>
							<Link to="/">
								About us
							</Link>
							<Link to="/">
								Contact
							</Link>
						</div>

						<div className="col-md-2">
							<div className="title">Tools</div>

							<Link to="/">
								Dashboard
							</Link>
							<Link to="/">
								How can we help?
							</Link>
							<Link to="/">
								Emergency support
							</Link>
						</div>

						<div className="col-md-4">
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
								Subscribe to the Newsletter
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
