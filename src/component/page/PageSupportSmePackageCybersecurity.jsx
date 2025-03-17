import React from "react";
import "./PageSupportSmePackageCybersecurity.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default class PageSupportSmePackageCybersecurity extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageSupportSmePackageCybersecurity">
				<div className="top-content mb-0">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-5 col-lg-6">
								<div className="row">
									<div className="col-md-12">
										<Breadcrumb>
											<Breadcrumb.Item>RESOURCES & SUPPORT</Breadcrumb.Item>
											<Breadcrumb.Item><Link to="/support-for-startups">SME
																								Package - Cybersecurity</Link></Breadcrumb.Item>
										</Breadcrumb>
									</div>

									<div className="col-md-12">
										<div className="text-content">
											<div className="h8 blue-text uppercase">SME Package -
																								Cybersecurity
											</div>
										</div>
									</div>

									<div className="col-md-12">
										<div className="text-content spaced-row">
											<h4>Anticipate threats and protect your company </h4>

											<p>Benefit from financial support for the implementation
																								of cybersecurity technologies or procedures within
																								your company.</p>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-6 col-md-5">
								<div className="vertically-centered">
									<img
										className="startup-visual"
										src="/img/SME_Logo_CyberSecurity.png"
										alt={"SME Package - Cybersecurity"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={"max-sized-section"}>
					<div className="row">
						<div className="col-md-12">
							<div className={"d-flex align-items-center justify-content-left "}>
								<div className={"mr-2"}>
									<i
										className="fas fa-info-circle fa-2x"
									/>
								</div>
								<div>
									<p className={"mt-0 mb-0"}>The SME Package – Cybersecurity helps SMEs assess their <b>current
																level of
																cybersecurity</b>, assists them in complying with
																the <b>NIS2</b> directive and
																facilitates the <b>implementation of cybersecurity technologies
																		and
																		procedures</b>.</p>
								</div>
							</div>
						</div>
					</div>
					<div className={"row"}>
						<div className="col-md-12">
							<p>Is eligible any company that:</p>
							<ul>
								<li>has an authorisation to establish granted by the Ministry of the Economy;</li>
								<li>meets the conditions for an SME in terms of staff numbers,
										annual turnover and annual balance sheet;</li>
								<li>has its registered office in Luxembourg.</li>
							</ul>
						</div>
					</div>

					<div className={"row"}>
						<div className="col-md-12">
							<p>To benefit from the SME Package - Cybersecurity programme, companies must carry
									out a project costing between <b>€3,000</b> excluding VAT
									and <b>€25,000</b> excluding VAT.</p>
						</div>
					</div>

					<div className="row mt-5">
						<div className="col-md-12">
							<div className={"d-flex align-items-center justify-content-left "}>
								<div className={"mr-2"}>
									<i
										className="fas fa-envelope fa-2x"
									/>
								</div>
								<div>
									<p className={"mt-0 mb-0"}>Companies interested in the SME Package - Cybersecurity
											should first contact the <a href={"https://www.houseofentrepreneurship.lu/"} target={"_blank"} rel={"noopener noreferrer"}>House of Entrepreneurship</a> of
											the <a href={"https://www.cc.lu/en/"} target={"blank"} rel={"noopener"}>Chamber of Commerce</a> or
											the <a href={"https://guichet.public.lu/fr/citoyens/organismes/organismes_entreprises/chambre-metiers/ehandwierk.html"} target={"_blank"} rel={"noopener noreferrer"}>eHandwierk Service of the Chambre des Métiers</a> (for craft businesses),
											which will help them to fill in the grant application form.</p>
								</div>
							</div>
						</div>
					</div>

					<div className="row mt-5">
						<div className="col-md-12">
							<div className={"d-flex-column align-items-center justify-content-left "}>
								<div style={{ width: "221px", height: "60px", marginBottom: "1rem" }} className={"mv-4"}>
									<a href={"https://nc3.lu/assessment-testing-and-training/fit4cybersecurity"} target={"_blank"} rel={"noopener noreferrer"}>
										<img
											src="/img/fit4logo.png"
											alt={"Fit4Cybersecurity"}
											className={"img-fluid"}
										/>
									</a>
								</div>
								<div>
									<p className={"lead font-weight-bold"}><strong>The company must undergo a pre-analysis by
											the <a href={"https://nc3.lu"} target={"_blank"} rel={"noopener noreferrer"}>National CybersecurityCompetence Center</a> of the <a href={"https://lhc.lu"} target={"_blank"} rel={"noopener noreferrer"}>Luxembourg House
													of Cybersecurity</a> based on the <a href={"https://nc3.lu/assessment-testing-and-training/fit4cybersecurity"} target={"_blank"} rel={"noopener noreferrer"}>Fit4Cybersecurity self-assessment tool</a>. </strong></p>
								</div>
							</div>
						</div>
					</div>

					<div className="row mt-5">
						<div className="col-md-12">
							<div className={"d-flex align-items-center justify-content-left "}>
								<div className={"mr-2"}>
									<i
										className="fas fa-link fa-2x"
									/>
								</div>
								<div>
									<p className={"mt-0 mb-0 font-weight-bold"}><strong>All details about the SME Package – Cybersecurity to be found on <a href={"https://guichet.public.lu/fr/entreprises/financement-aides/regime-sme-packages/soutien-pme/sme-package-cybersecurity.html"} target={"_blank"} rel={"noopener noreferrer"}>guichet.lu</a>.</strong></p>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>
		);
	}
}
