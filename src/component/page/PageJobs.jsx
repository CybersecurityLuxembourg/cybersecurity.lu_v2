import React from "react";
import "./PageJobs.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tab from "../tab/Tab.jsx";
import PageJobsJobs from "./pagejobs/PageJobsJobs.jsx";
import PageJobsInternship from "./pagejobs/PageJobsInternship.jsx";
import { getUrlParameter } from "../../utils/url.jsx";

export default class PageJobs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuLabels: ["Jobs", "Internship"],
			menuValues: ["jobs", "internship"],
			selectedMenu: "jobs",
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
	}

	onMenuClick(m) {
		this.props.history.push("?tab=" + m);
	}

	render() {
		return (
			<div id="PageJobs">
				<div className="top-content">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-12">
								<Breadcrumb>
									<Breadcrumb.Item>Skills & jobs</Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/jobs">Jobs & internship</Link></Breadcrumb.Item>
								</Breadcrumb>
							</div>

							<div className="col-md-12">
								<div className="text-content">
									<div className="h8 blue-text uppercase">Jobs & internship</div>
								</div>
							</div>

							<div className="col-md-5">
								<div className="text-content">
									<h4>Unlock Your Cybersecurity Career in Luxembourg</h4>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<p>Welcome to cybersecurity.lu, your gateway to exciting
								cybersecurity jobs and internships in Luxembourg. In collaboration
								with Moovijob.lu, we bring you exclusive access to a wide range of
								opportunities in the dynamic field of cybersecurity.</p>

								<p>Discover rewarding careers, gain valuable experience, and
								contribute to safeguarding the digital landscape.</p>
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
									<PageJobsJobs
										key={0}
										taxonomies={this.props.taxonomies}
									/>,
									<PageJobsInternship
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
