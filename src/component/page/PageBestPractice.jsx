import React from "react";
import "./PageBestPractice.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tab from "../tab/Tab.jsx";
import PageBestPracticeDetectReact from "./pagebestpractice/PageBestPracticeDetectReact.jsx";
import PageBestPracticeProtectPrevent from "./pagebestpractice/PageBestPracticeProtectPrevent.jsx";
import PageBestPracticeTestImprove from "./pagebestpractice/PageBestPracticeTestImprove.jsx";
import { getUrlParameter } from "../../utils/url.jsx";

export default class PageBestPractice extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuLabels: ["Detect & react", "Protect & prevent", "Test & improve"],
			menuValues: ["detect_react", "protect_prevent", "test_improve"],
			selectedMenu: "detect_react",
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
			<div id="PageBestPractice">
				<div className="top-content">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-12">
								<Breadcrumb>
									<Breadcrumb.Item>Resources & support</Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/best-practice">Cybersecurity tips & best practices</Link></Breadcrumb.Item>
								</Breadcrumb>
							</div>

							<div className="col-md-12">
								<div className="text-content">
									<div className="h8 blue-text uppercase">Cybersecurity tips & best practices</div>
								</div>
							</div>

							<div className="col-md-5">
								<div className="text-content">
									<h4>Stay safe online with these Cybersecurity best practices</h4>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<p>The Cyber Awareness and Best Practice page at cybersecurity.lu is your source
								for valuable tips and resources on how to stay safe online.</p>

								<p>From best practices for secure password management to safe online
								browsing, our page provides essential information
								on cybersecurity awareness</p>
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
									<PageBestPracticeDetectReact
										key={0}
										taxonomies={this.props.taxonomies}
										{...this.props}
									/>,
									<PageBestPracticeProtectPrevent
										key={1}
										taxonomies={this.props.taxonomies}
										{...this.props}
									/>,
									<PageBestPracticeTestImprove
										key={2}
										taxonomies={this.props.taxonomies}
										{...this.props}
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
