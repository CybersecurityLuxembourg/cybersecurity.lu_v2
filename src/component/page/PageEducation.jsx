import React from "react";
import "./PageEducation.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tab from "../tab/Tab.jsx";
import PageEducationEducation from "./pageeducation/PageEducationEducation.jsx";
import PageEducationTrainings from "./pageeducation/PageEducationTrainings.jsx";

export default class PageEducation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuLabels: ["Education", "Trainings"],
			selectedMenu: 0,
		};
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

							<div className="col-md-6">
								<div className="text-content">
									<div className="blue-title">Education & trainings</div>

									<h4>Discover Cybersecurity scholarships
									and training opportunities from our partners</h4>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<p>Our education and training page is a gateway to a wide
								range of cybersecurity scholarships and training opportunities
								from our trusted partners.</p>

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
								onMenuClick={(m) => this.setState({ selectedMenu: m })}
								selectedMenu={this.state.selectedMenu}
								labels={this.state.menuLabels}
								keys={[0, 1]}
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
