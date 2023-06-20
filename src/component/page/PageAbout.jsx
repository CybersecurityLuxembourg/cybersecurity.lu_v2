import React from "react";
import "./PageAbout.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getApiURL } from "../../utils/env.jsx";

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
									<div className="h8 blue-text uppercase">The initiative</div>

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
									<div className="vertical-text">
										<p>We are on the eve of creating ultra-connected
										human societies, based increasingly on mobile
										technologies, the growing use of cloud computing
										solutions and the continued development of the
										Internet of Things. While welcoming new opportunities, we
										also expose ourselves to multiple new risks, with an
										augmented dependency on the availability and reliability
										of data.</p>
									</div>
								</div>

								<div className="col-md-1"/>

								<div className="col-md-5">
									<img
										src="/img/minister-fayot.png"
										alt="Ministre de l'Economie Franz Fayot"
									/>
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

									<p>Europe calls for the creation of sovereign products and services
									that guarantee these values. Luxembourg, with its IT and cybersecurity
									ecosystem, is answering this call in multiple ways.</p>

									<p>New challenges, requesting innovative cybersecurity services
									and products lie ahead of us, while we continue to consolidate
									security in existing networks and systems. Cooperation, national
									and international, will play an ever-important role.</p>

									<p>In order to achieve an inclusive, flourishing and trusted digital
									economy, the Ministry of the Economy especially promotes best practices
									among businesses and the implementation of informed governance via a
									collaborative risk management approach.<br/>
									I am pleased to endorse the mapping 2020 of the national
									cybersecurity ecosystem. It is another proof of the success of
									continuous cooperation taking place at the level of our partners
									in education and research, the public & private partnerships, the
									authorities and regulators, and of our local companies & start-ups.</p>

									<p>It is their expertise and their commitment, embedded in the
									national cybersecurity strategy coordinated by the Interministerial
									coordination committee for cyber prevention and cybersecurity, that
									creates the fabric of the trusted cybersecurity ecosystem we proud
									ourselves with in Luxembourg.</p>

									<div className="h8">
										Mr Franz Fayot<br/>
										Minister of the Economy
									</div>

									<h5>Securing cyberspace at all levels to support the digital transformation
									that characterises our economy and society</h5>

									<p>When it comes to cybersecurity, CYBERSECURITY Luxembourg portal, the
									national cybersecurity portal, is the central place to go for all the
									necessary information (from the national cybersecurity strategy to the
									latest news from the entities that make up the cybersecurity
									ecosystem), all relevant actors, services & products. The portal has
									also been developed with the aim of fostering networking, collaboration
									and innovation.</p>

									<p>The national cybersecurity portal serves a twofold purpose:</p>

									<ul>
										<li>Being the entry door to cybersecurity services/products/information made
										available for any entities/users having cybersecurity needs</li>
										<li>Fostering and empowering the national cybersecurity ecosystem
										within Luxembourg and abroad: connecting entities, creating and
										developing synergies</li>
									</ul>

									<h5>Empowering the cybersecurity ecosystem</h5>

									<p>Cybersecurity is a key component in the country’s efforts to promote
									all aspects of the digital transformation and develop its data-driven
									economy. Therefore, the initiative is part of the national cybersecurity
									strategy.</p>

									<p>Under the High Patronage of the Ministry of the Economy, CYBERSECURITY
									Luxembourg is led and driven by key national cybersecurity stakeholders
									that are HCNP, High Commission for National Protection and Luxembourg
									House of Cybersecurity, the Cybersecurity Agency for the Luxembourg
									Economy and Municipalities, and actively supported by Luxinnovation, the
									national agency for innovation and the promotion of Luxembourg’s expertise
									internationally.</p>

									<p>By bringing together all cybersecurity actors, the portal aims to strengthen
									the links between the actors of the Luxembourg cybersecurity ecosystem in order
									to reinforce its relevance and impact and to make it more visible and available
									at national, European and international level.</p>

									<p>The promotion of the Luxembourg cybersecurity ecosystem is made through
									the national brand “CYBERSECURITY Luxembourg”, an integral part of the
									toolbox intended to enhance and structure the promotion of Luxembourg in
									the field of cybersecurity. All actors from the CYBERSECURITY Luxembourg
									ecosystem are invited to use the national branding, which guidelines are
									available here.</p>

									<h5>What is the ecosystem like?</h5>

									<p>The market mapping gathers all 300+ entities (private, public and
									civil sectors) involved in cybersecurity. Based on the ECSO
									Cybersecurity Market Radar classification, the directory unveils an
									almost exhaustive range of cybersecurity solutions that cover the risk
									management supply chain, highlighting the existing expertise and competence
									amongst Luxembourg ecosystem and identifying the gaps and opportunities for
									improvement.</p>

									<p>The first mapping was introduced in October 2019, a second mapping was
									published in 2020.<br/>
									Currently, of the 300+ organisations in the ecosystem, a quarter have
									cybersecurity as their core business and more than 20% are
									start-ups, highlighting the country&apos;s great potential for innovation in
									cybersecurity.</p>

									<p>Cybersecurity has been integrated as a focus area among non-IT traditional
									businesses, making it a real asset to the Luxembourg economy.</p>

									<h5>The methodology used for the ecosystem mapping: a 3-step process</h5>

									<img
										src="img/3-step-process.png"
									/>

									<p><b>1. Data was gathered using different sources from the Market
									Intelligence service of Luxinnovation (LXI-Market Intelligence). The used
									data sources are as follows:</b></p>
								</div>

								<div className="offset-md-2 col-md-8">
									<img
										src="img/market-intelligence-data.png"
									/>
								</div>

								<div className="col-md-12">
									<p><b>2. Each company was then reviewed and categorised by Luxembourg
									House of Cybersecurity based on
									the <a
										target="_blank"
										rel="noreferrer"
										href={getApiURL() + "public/get_public_document/ECSO-cybersecurity-market-radar-brochure_20190911.pdf"}>
										ECSO Cybersecurity Market Radar
									</a>.</b></p>
								</div>

								<div className="offset-md-2 col-md-8">
									<img
										src="img/cybersecurity-ecso-taxonomy.png"
									/>
								</div>

								<div className="col-md-12">
									<p>As part of this step, Luxembourg House of Cybersecurity
									identified the members of
									the ecosystem whose core business is related to
									cybersecurity and categorised the solutions
									provided by each member of the ecosystem.</p>

									<p><b>3. Finally, LXI-Market Intelligence and Luxembourg House of Cybersecurity
									analysed the ecosystem.</b></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
