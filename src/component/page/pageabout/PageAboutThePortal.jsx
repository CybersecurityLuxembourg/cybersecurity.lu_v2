import React from "react";
import "./PageAboutThePortal.css";
import { getPrivateAppURL } from "../../../utils/env.jsx";

export default class PageAboutThePortal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageAboutThePortal">
				<div className="row">
					<div className="col-md-12">
						<h4>The portal</h4>

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
							<li><b>Being the entry door to cybersecurity actors, services, tools
							and information</b> available for any entity or user having
							cybersecurity needs,</li>
							<li><b>Fostering and empowering the national cybersecurity ecosystem</b> within
							Luxembourg and abroad: connecting entities, creating
							and developing synergies</li>
						</ul>

						<p>Cybersecurity is a key component in the country’s efforts to
						strengthen the digital transformation and develop its open data
						economy. Therefore, the CYBERSECURITY Luxembourg initiative is part
						of the <a
							href="https://hcpn.gouvernement.lu/dam-assets/fr/publications/brochure-livre/strategie-nationale-cybersecurite-4/National-Cybersecurity-Strategy-IV.pdf"
							target="_blank"
							rel="noreferrer">national cybersecurity strategy</a>.</p>
					</div>
				</div>
			</div>
		);
	}
}
