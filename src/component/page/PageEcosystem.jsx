import React from "react";
import "./PageEcosystem.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getUrlParameter } from "../../utils/url.jsx";
import PageEcosystemPrivateSector from "./pageecosystem/PageEcosystemPrivateSector.jsx";
import PageEcosystemPublicSector from "./pageecosystem/PageEcosystemPublicSector.jsx";
import PageEcosystemInitiatives from "./pageecosystem/PageEcosystemInitiatives.jsx";
import Tab from "../tab/Tab.jsx";

export default class PageEcosystem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuLabels: ["Private sector", "Public sector", "Clubs, associations & initiatives"],
			menuValues: ["private-sector", "public-sector", "initiatives"],
			selectedMenu: getUrlParameter("tab"),
		};
	}

	onMenuClick(m) {
		this.props.history.push("?tab=" + m);
	}

	componentDidUpdate() {
		if (getUrlParameter("tab")
			&& this.state.menuValues.indexOf(getUrlParameter("tab")) >= 0
			&& getUrlParameter("tab") !== this.state.selectedMenu) {
			this.setState({ selectedMenu: getUrlParameter("tab") });
		}
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageEcosystem"}>
				<div className="max-sized-section">
					<div className="row">
						<div className="col-md-12">
							<Breadcrumb>
								<Breadcrumb.Item>The Ecosystem</Breadcrumb.Item>
								{getUrlParameter("tab") !== "public-sector" && getUrlParameter("tab") !== "initiatives"
									&& <Breadcrumb.Item><Link to="/ecosystem?tab=private-sector">Private sector</Link></Breadcrumb.Item>}
								{getUrlParameter("tab") === "public-sector"
									&& <Breadcrumb.Item><Link to="/ecosystem?tab=public-sector">Public sector</Link></Breadcrumb.Item>}
								{getUrlParameter("tab") === "initiatives"
									&& <Breadcrumb.Item><Link to="/ecosystem?tab=initiatives">Clubs, associations & initiatives</Link></Breadcrumb.Item>}
							</Breadcrumb>
						</div>

						<div className="col-md-12">
							<Tab
								onMenuClick={(m) => this.onMenuClick(m)}
								selectedMenu={this.state.selectedMenu}
								labels={this.state.menuLabels}
								keys={this.state.menuValues}
								content={[
									<PageEcosystemPrivateSector
										key={this.state.menuValues[0]}
										taxonomies={this.props.taxonomies}
									/>,
									<PageEcosystemPublicSector
										key={this.state.menuValues[1]}
										taxonomies={this.props.taxonomies}
									/>,
									<PageEcosystemInitiatives
										key={this.state.menuValues[2]}
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
