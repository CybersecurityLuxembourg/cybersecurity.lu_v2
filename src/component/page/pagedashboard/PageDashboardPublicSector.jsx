import React from "react";
import "./PageDashboardPublicSector.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import BoxWithTitle from "../../box/BoxWithTitle.jsx";

export default class PageDashboardPublicSector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			publicEntities: null,
		};
	}

	componentDidMount() {
		this.getPublicEntities();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.getPublicEntities();
		}
	}

	getPublicEntities() {
		if (this.props.taxonomies
			&& this.props.taxonomies.taxonomy_values) {
			const entityTypes = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE")
				.filter((v) => v.name === "PUBLIC SECTOR")
				.map((v) => v.id);

			if (entityTypes.length > 0) {
				this.setState({
					publicEntities: null,
				}, () => {
					const params = {
						...this.state.filters,
						taxonomy_values: entityTypes,
					};

					getRequest.call(this, "public/get_public_entities?" + dictToURI(params), (data) => {
						this.setState({
							publicEntities: data,
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				});
			}
		}
	}

	render() {
		return (
			<div id={"PageDashboardPublicSector"}>
				<div className="max-sized-section">
					<div className="content">
						<div className="row spaced-row header">
							<div className="col-md-6">
								<div className="title">
									<h2>Public Sector</h2>
								</div>
							</div>

							<div className="col-md-6">
								<div className="row">
									<div className="col-md-6">
										<div className={"total-institutions"}>
											<h3 className="count">
												{this.state.publicEntities
													? this.state.publicEntities.length
													: "Loading..."
												}
											</h3>

											<h6>
												Institutions are part of the ecosystem
											</h6>

											<button
												className="small"
												onClick={() => this.props.history.push("ecosystem?tab=public-sector")}
											>
												Access the full list &nbsp;<i className="fas fa-arrow-right"/>
											</button>
										</div>
									</div>
									<div className="col-md-6">
										<div className="box">
											<div className="h8 spaced-row">
												National contact point
											</div>

											<a
												href="https://hcpn.gouvernement.lu/"
												target="_blank"
												rel="noreferrer"
											>
												<img
													className="spaced-row"
													src="/img/logo-hcpn.png"
													alt="Logo HCPN"
												/>
											</a>
										</div>
									</div>

									<div className="col-md-12">
										<div className="box framework-box">
											<i className="fas fa-balance-scale"/>

											<div className="h8">
												Access the latest and upcoming International, European
												and National Legal Frameworks
											</div>

											<div className="right-buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("legal")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<h5>A closer look to the national actors</h5>
							</div>

							<div className="col-md-8">
								<BoxWithTitle
									title={"National Strategy & Governance"}
									content={<div className="row">
										<div className="offset-md-1 col-md-10">
											<img
												src="/img/national-strategy-diagram.svg"
												alt="National strategy diagram"
											/>
										</div>
										<div className="col-md-12">
											<div className="right-buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("ecosystem?tab=public-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>}
								/>
							</div>

							<div className="col-md-4">
								<BoxWithTitle
									title={"Preparedness & Response"}
									content={<div className="row">
										<div className="col-6">
											<a
												href="https://www.govcert.lu/"
												target="_blank"
												rel="noreferrer"
											>
												<img
													src="/img/logo-govcert.png"
													alt="Logo GovCert"
												/>
											</a>
										</div>
										<div className="col-6">
											<a
												href="https://www.circl.lu/"
												target="_blank"
												rel="noreferrer"
											>
												<img
													src="/img/logo-circl.png"
													alt="Logo Circl"
												/>
											</a>
										</div>
										<div className="offset-2 col-8">
											<a
												href="https://hcpn.gouvernement.lu/"
												target="_blank"
												rel="noreferrer"
											>
												<img
													className="hcpn-logo"
													src="/img/logo-hcpn.png"
													alt="Logo HCPN"
												/>
											</a>
										</div>
										<div className="col-5">
											<a
												href="https://www.cert.lu/"
												target="_blank"
												rel="noreferrer"
											>
												<img
													src="/img/logo-certlu.png"
													alt="Logo CertLu"
												/>
											</a>
										</div>
										<div className="offset-2 col-5">
											<a
												href="https://infocrise.public.lu/"
												target="_blank"
												rel="noreferrer"
											>
												<img
													src="/img/logo-infocrise.png"
													alt="Logo InfoCrise"
												/>
											</a>
										</div>
									</div>}
								/>
								<BoxWithTitle
									title={"Research & Development"}
									content={<div className="row">
										<div className="col-6">
											<a
												href="https://www.list.lu/"
												target="_blank"
												rel="noreferrer"
											>
												<img
													src="/img/logo-list.png"
													alt="Logo LIST"
												/>
											</a>
										</div>
										<div className="col-6">
											<a
												href="https://www.uni.lu/snt-en/"
												target="_blank"
												rel="noreferrer"
											>
												<img
													src="/img/logo-unilu.png"
													alt="Logo SNT"
												/>
											</a>
										</div>
									</div>}
								/>
							</div>

							<div className="col-md-12">
								<BoxWithTitle
									className={"education-training"}
									title={"Education & Training"}
									content={<div className="row">
										<div className="col-md-4">
											<div className="h8">
												Formal Education
											</div>

											<div className="row">
												<div className="col-5">
													<a
														href="https://www.lgk.lu/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-lyceegk.png"
															alt="Logo Lycée GK"
														/>
													</a>
												</div>
												<div className="offset-2 col-5">
													<a
														href="https://www.artsetmetiers.lu/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-unkn.png"
															alt="Logo lycée Arts et Métiers"
														/>
													</a>
												</div>
												<div className="offset-3 col-6">
													<a
														href="https://www.uni.lu/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-unilu-solo.png"
															alt="Logo Uni.lu"
														/>
													</a>
												</div>
											</div>

											<div className="buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("ecosystem?tab=public-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
										<div className="col-md-4">
											<div className="grey-horizontal-bar show-on-mobile"/>

											<div className="h8">
												Initial and Ongoing Training, Re-skilling
												and Upskilling
											</div>

											<div className="row">
												<div className="col-5">
													<a
														href="https://etat.public.lu/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-admin-pub.png"
															alt="Logo administration publique"
														/>
													</a>
												</div>
												<div className="offset-2 col-5">
													<a
														href="https://www.houseoftraining.lu/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-hot.png"
															alt="Logo House of Training"
														/>
													</a>
												</div>
												<div className="col-4">
													<a
														href="https://nc3.lu/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-nc3.png"
															alt="Logo NC3"
														/>
													</a>
												</div>
												<div className="col-4">
													<a
														href="https://www.cyberwayfinder.com/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-cwf.png"
															alt="Logo CWF"
														/>
													</a>
												</div>
												<div className="col-4">
													<a
														href="https://dlh.lu/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-dlh.png"
															alt="Logo DLH"
														/>
													</a>
												</div>
											</div>

											<div className="buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("ecosystem?tab=public-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
										<div className="col-md-4">
											<div className="grey-horizontal-bar show-on-mobile"/>

											<div className="h8">
												Awareness Raising Activities
											</div>
											<div className="row">
												<div className="offset-3 col-6">
													<a
														href="https://www.bee-secure.lu/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-beesecure.png"
															alt="Logo BeeSecure"
														/>
													</a>
												</div>
												<div className="col-5">
													<a
														href="https://cybersecuritymonth.eu/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-ecsm.png"
															alt="Logo ECSM"
														/>
													</a>
												</div>
												<div className="offset-2 col-5">
													<a
														href="https://cswl.lu/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															className="fixed-height"
															src="/img/logo-cswl.png"
															alt="Logo CSWL"
														/>
													</a>
												</div>
											</div>
											<div className="buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("ecosystem?tab=public-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
