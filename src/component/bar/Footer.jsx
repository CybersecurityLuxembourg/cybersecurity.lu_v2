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
								src="/img/logo-cyberlux-full.png"
								alt="CYBERLUX Logo"
							/>

							<div className="row">
								<div className="col-md-12">
									<div className="patronage">
										<b>The national cybersecurity portal, for everyone.</b> All in
										one place, explore & be a part of this community-driven
										platform whether you are a seasoned pro or just starting out.
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-2">
							<div className="title">Your portal</div>

							<div className="link">
								<Link to="/news">
									Latest News
								</Link>
							</div>
							<div className="link">
								<Link to="/events">
									Upcoming Events
								</Link>
							</div>
							<div className="link">
								<Link to="/jobs">
									Jobs
								</Link>
							</div>
							<div className="link">
								<Link to="/about">
									About
								</Link>
							</div>
							<div className="link">
								<Link to="/contact">
									Contact
								</Link>
							</div>
						</div>

						<div className="col-md-3">
							<div className="link">
								<Link to="/ecosystem">
									The ecosystem
								</Link>
							</div>
							<div className="link">
								<Link to="/dashboard">
									Dashboard
								</Link>
							</div>
							<div className="link">
								<Link to="/contact">
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
									title="X CYBERLUX"
									className="text-capitalize">
									<img
										src="/img/logo-x.svg"
										alt="X Logo"
									/>
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
