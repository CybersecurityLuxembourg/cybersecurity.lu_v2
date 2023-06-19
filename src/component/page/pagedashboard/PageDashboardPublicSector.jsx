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
											>
												Access the full list &nbsp;<i className="fas fa-arrow-right"/>
											</button>
										</div>
									</div>
									<div className="col-md-6">
										<div className="box">
											<div className="h8">
												Main point of contact
											</div>

											<img
												src="/img/govcert-logo.png"
												alt="Govcert logo"
											/>
										</div>
									</div>

									<div className="col-md-12">
										<div className="box">
											<div className="h8">
												Access the latest and upcoming International, European
												and National Legal Frameworks
											</div>

											<div className="right-buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("public-sector")}
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
													onClick={() => this.props.history.push("public-sector")}
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
										<div className="col-md-6">
											<img
												className="fixed-height"
												src="/img/national-strategy-diagram.svg"
												alt="National strategy diagram"
											/>
										</div>
										<div className="col-md-6">
											<img
												className="fixed-height"
												src="/img/national-strategy-diagram.svg"
												alt="National strategy diagram"
											/>
										</div>
										<div className="offset-md-3 col-md-6">
											<img
												className="fixed-height"
												src="/img/national-strategy-diagram.svg"
												alt="National strategy diagram"
											/>
										</div>
										<div className="col-md-12">
											<div className="right-buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("public-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
									</div>}
								/>
								<BoxWithTitle
									title={"Research & Development"}
									content={<div className="row">
										<div className="col-md-6">
											<img
												className="fixed-height"
												src="/img/national-strategy-diagram.svg"
												alt="National strategy diagram"
											/>
										</div>
										<div className="col-md-6">
											<img
												className="fixed-height"
												src="/img/national-strategy-diagram.svg"
												alt="National strategy diagram"
											/>
										</div>
										<div className="offset-md-3 col-md-6">
											<img
												className="fixed-height"
												src="/img/national-strategy-diagram.svg"
												alt="National strategy diagram"
											/>
										</div>
										<div className="col-md-12">
											<div className="right-buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("public-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
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
												<div className="col-md-5">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
												<div className="offset-md-2 col-md-5">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
												<div className="offset-md-3 col-md-6">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
											</div>

											<div className="buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("public-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
										<div className="col-md-4">
											<div className="h8">
												Initial and Ongoing Training, Re-skilling
												and Upskilling
											</div>

											<div className="row">
												<div className="col-md-5">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
												<div className="offset-md-2 col-md-5">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
												<div className="col-md-4">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
												<div className="col-md-4">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
												<div className="col-md-4">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
											</div>

											<div className="buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("public-sector")}
												>
													Access the full list &nbsp;<i className="fas fa-arrow-right"/>
												</button>
											</div>
										</div>
										<div className="col-md-4">
											<div className="h8">
												Awareness Raising Activities
											</div>
											<div className="row">
												<div className="offset-md-3 col-md-6">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
												<div className="col-md-4">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
												<div className="offset-md-4 col-md-4">
													<img
														className="fixed-height"
														src="/img/national-strategy-diagram.svg"
														alt="National strategy diagram"
													/>
												</div>
											</div>
											<div className="buttons">
												<button
													className="transparent"
													onClick={() => this.props.history.push("public-sector")}
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
