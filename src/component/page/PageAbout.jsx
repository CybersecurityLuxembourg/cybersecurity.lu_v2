import React from "react";
import "./PageAbout.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import PageAboutThePortal from "./pageabout/PageAboutThePortal.jsx";
import PageAboutBrandToolkit from "./pageabout/PageAboutBrandToolkit.jsx";
import { getUrlParameter } from "../../utils/url.jsx";
import Tab from "../tab/Tab.jsx";

export default class PageAbout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuLabels: ["The Portal", "Brand Toolkit"],
			menuValues: ["portal", "toolkit"],
			selectedMenu: "portal",
		};
	}

	componentDidMount() {
		if (getUrlParameter("tab") !== null
			&& this.state.menuValues.indexOf(getUrlParameter("tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("tab") });
		}
	}

	componentDidUpdate() {
		if (this.state.selectedMenu !== getUrlParameter("tab")
			&& getUrlParameter("tab")) {
			if (this.state.menuValues.indexOf(getUrlParameter("tab")) >= 0) {
				this.setState({ selectedMenu: getUrlParameter("tab") });
			} else {
				this.props.history.push("?");
				this.setState({ selectedMenu: "portal" });
			}
		}

		if (this.state.selectedMenu !== "portal"
			&& !getUrlParameter("tab")) {
			this.setState({ selectedMenu: "portal" });
		}
	}

	onMenuClick(m) {
		this.props.history.push("?tab=" + m);
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
						<div className="col-md-12">
							<Tab
								onMenuClick={(m) => this.onMenuClick(m)}
								selectedMenu={this.state.selectedMenu}
								labels={this.state.menuLabels}
								keys={this.state.menuValues}
								content={[
									<PageAboutThePortal
										key={0}
									/>,
									<PageAboutBrandToolkit
										key={1}
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
