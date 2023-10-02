import React from "react";
import "./PageSupportForStartups.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tab from "../tab/Tab.jsx";
import PageSupportForStartupsNews from "./pagesupportforstartups/PageSupportForStartupsNews.jsx";
import PageSupportForStartupsLaunchpad from "./pagesupportforstartups/PageSupportForStartupsLaunchpad.jsx";
import PageSupportForStartupsPartners from "./pagesupportforstartups/PageSupportForStartupsPartners.jsx";
import { getUrlParameter } from "../../utils/url.jsx";

export default class PageSupportForStartups extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuLabels: ["News", "Launchpad", "Partners"],
			menuValues: ["news", "launchpad", "partners"],
			selectedMenu: "news",
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
			<div id="PageSupportForStartups">
				<div className="top-content">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-12">
								<Breadcrumb>
									<Breadcrumb.Item>RESOURCES & SUPPORT</Breadcrumb.Item>
									<Breadcrumb.Item><Link to="/support-for-startups">Support for Startups</Link></Breadcrumb.Item>
								</Breadcrumb>
							</div>

							<div className="col-md-12">
								<div className="text-content">
									<div className="h8 blue-text uppercase">Support for Startups</div>
								</div>
							</div>

							<div className="col-md-5">
								<div className="text-content">
									<h4>Boost your business with the help of trusted partners</h4>
								</div>
							</div>

							<div className="col-md-1"/>

							<div className="col-md-5">
								<p>Luxembourg is the perfect place to start or scale your
								entrepreneurial adventure. The thriving startup community
								active in cybersecurity represents more than 20% of the national
								cybersecurity ecosystem.</p>
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
									<PageSupportForStartupsNews
										key={0}
										taxonomies={this.props.taxonomies}
										{...this.props}
									/>,
									<PageSupportForStartupsLaunchpad
										key={1}
										taxonomies={this.props.taxonomies}
										{...this.props}
									/>,
									<PageSupportForStartupsPartners
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
