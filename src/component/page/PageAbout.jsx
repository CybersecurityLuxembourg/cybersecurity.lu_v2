import React from "react";
import "./PageAbout.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getPrivateAppURL } from "../../utils/env.jsx";
import PageAboutLogo from "./pageabout/PageAboutLogo.jsx";
import PageAboutLogoUsage from "./pageabout/PageAboutLogoUsage.jsx";

export default class PageAbout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	goToDiv(id) {
		const elmnt = document.getElementById(id);
		elmnt.scrollIntoView();
	}

	render() {
		return (
			<div id="PageAbout">
				<div className="top-content">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-6">
								<Breadcrumb>
									<Breadcrumb.Item>About us</Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/about">The initiative</Link></Breadcrumb.Item>
								</Breadcrumb>

								<div className="text-content">
									<div className="h8 blue-text uppercase">The initiative</div>

									<h4>The National Cybersecurity Portal</h4>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<div className="vertically-centered">
									<img
										className={"logo"}
										src="/img/logo-cyberlux-full.png"
										alt="CYBERLUX Logo"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="max-sized-section">
					<div className="row">
						<div className="col-md-3">
							<div className="h8 blue-text uppercase">
								The national cybersecurity portal
							</div>

							<div className="menu">
								<div
									className="menu-element selected"
									onClick={() => this.goToDiv("PageAbout-about")}>
									About
								</div>

								<div
									className="menu-element"
									onClick={() => this.goToDiv("PageAbout-toolkit")}>
									A brand toolkit for all ecosystem members
								</div>
							</div>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-8">
							<div className="row">
								<div className="col-md-12">
									<h4 id="PageAbout-about">About</h4>

									<p><b>cybersecurity.lu</b> is the <b>Luxembourg national
									cybersecurity portal</b>,
									the <b>all-in-one place</b> to find a comprehensive range of resources, expertise
									and support.</p>

									<p><b>cybersecurity.lu</b> is a <b>collaborative platform</b> where
									everyone is free
									to suggest content and, for some sections, to directly contribute
									content as a member of the ecosystem, after <a
										href={getPrivateAppURL()}
										target="_blank"
										rel="noreferrer">signing up here</a>. All
									active cybersecurity players from Luxembourg can request to be
									listed amongst the national cybersecurity ecosystem, be it in
									the “private sector”, “public sector” or “associations, initiatives
									and initiatives”. <b>No membership fees apply, being part of the community
									is completely free.</b></p>

									<p>The national portal, and more generally the ‘CYBERSECURITY
									Luxembourg’ initiative, is managed by the <a
										href={"https://lhc.lu"}
										target="_blank"
										rel="noreferrer">Luxembourg House of Cybersecurity</a>, the
									Cybersecurity Agency for the Luxembourg Economy
									and Municipalities.</p>

									<p><i>“The portal has been developed with the aim of fostering
									networking, collaboration and innovation within the cybersecurity
									community, as well as to create visibility and promote the Luxembourg
									expertise in cybersecurity.”</i>, Pascal Steichen, CEO of the Luxembourg
									House of Cybersecurity.</p>

									<h5>Securing cyberspace at all levels to support the digital transformation
									that characterises our economy and society</h5>

									<p>The national cybersecurity portal serves a twofold purpose:</p>

									<ul>
										<li>Being the entry door to cybersecurity actors, services, tools
										and information available for any entity or user having
										cybersecurity needs,</li>
										<li>Fostering and empowering the national cybersecurity ecosystem
										within Luxembourg and abroad: connecting entities, creating
										and developing synergies</li>
									</ul>

									<p>Cybersecurity is a key component in the country’s efforts to
									strengthen the digital transformation and develop its open data
									economy. Therefore, the CYBERSECURITY Luxembourg initiative is part
									of the national cybersecurity strategy.</p>

									<h4 id="PageAbout-toolkit">A brand toolkit for all ecosystem members</h4>

									<p>The promotion of the Luxembourg cybersecurity ecosystem is made through
									the national brand “CYBERSECURITY Luxembourg”, intended to enhance and
									structure the promotion of Luxembourg in the field of cybersecurity.</p>

									<p>Learn about the CYBERSECURITY Luxembourg brand guidelines, download
									the logos and icons, or use the brand colors.</p>

									<p>All members of the Luxembourg cybersecurity ecosystem are invited to
									actively use the CYBERSECURITY Luxembourg brand.</p>

									<h5>Download the version of the logo you need:</h5>

									<PageAboutLogo/>

									<p>To have a harmonized and strong identity, please remember
									to use it the right way.</p>

									<h5>How to use the logo:</h5>

									<PageAboutLogoUsage/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
