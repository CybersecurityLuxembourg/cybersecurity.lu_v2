import React from "react";
import "./PageEducation.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tab from "../tab/Tab.jsx";
import PageEducationEducation from "./pageeducation/PageEducationEducation.jsx";
import PageEducationTrainings from "./pageeducation/PageEducationTrainings.jsx";
import { getUrlParameter } from "../../utils/url.jsx";

export default class PageEducation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuLabels: ["Education", "Trainings"],
			menuValues: ["education", "trainings"],
			selectedMenu: "education",
		};
	}

	componentDidMount() {
		if (getUrlParameter("tab") !== null && this.state.menuValues.indexOf(getUrlParameter("tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("tab") });
		}
	}

	componentDidUpdate() {
		if (this.state.selectedMenu !== getUrlParameter("tab")
			&& this.state.menuValues.indexOf(getUrlParameter("tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("tab") });
		}

		if (!getUrlParameter("tab") && this.state.selectedMenu !== "education") {
			this.setState({ selectedMenu: "education" });
		}
	}

	onMenuClick(m) {
		this.props.history.push("?tab=" + m);
	}

	render() {
		return (
			<div id="PageEducation">
				<div className="top-content">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-12">
								<Breadcrumb>
									<Breadcrumb.Item>Skills & jobs</Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/education">Education & trainings</Link></Breadcrumb.Item>
								</Breadcrumb>
							</div>

							<div className="col-md-12">
								<div className="text-content">
									<div className="h8 blue-text uppercase">Education & trainings</div>
								</div>
							</div>

							<div className="col-md-5">
								<div className="text-content">
									<h4>Discover Cybersecurity scholarships
									and training opportunities from our partners</h4>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<p>Our education and training page is a gateway to a wide
								range of cybersecurity scholarships and training opportunities
								from trusted players.</p>

								<p>Browse our selection of programs to find the best fit for
								your needs and interests, whether you&apos;re looking to start a
								career in cybersecurity or enhance your existing skills.</p>
							</div>
						</div>
					</div>
				</div>

				<div className="max-sized-section">
					<div className="row">
						<div className="col-md-12">
							<Tab
								onMenuClick={(m) => this.onMenuClick(m)}
								selectedMenu={this.state.selectedMenu}
								labels={this.state.menuLabels}
								keys={this.state.menuValues}
								content={[
									<PageEducationEducation
										key={0}
										taxonomies={this.props.taxonomies}
									/>,
									<PageEducationTrainings
										key={1}
										taxonomies={this.props.taxonomies}
									/>,
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
