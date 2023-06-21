import React from "react";
import "./PageDashboard.css";
import Tab from "../tab/Tab.jsx";
import PageDashboardOverview from "./pagedashboard/PageDashboardOverview.jsx";
import PageDashboardPublicSector from "./pagedashboard/PageDashboardPublicSector.jsx";
import PageDashboardPrivateSector from "./pagedashboard/PageDashboardPrivateSector.jsx";

export default class PageDashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: 0,
		};
	}

	render() {
		return (
			<div id={"PageDashboard"}>
				<div className="max-sized-section">
					<div className="header-content">
						<div className="row">
							<div className="col-md-12">
								<div className="text-content">
									<div>
										<h2>The Ecosystem Dashboard</h2>

										<div className="catch-phrase">
											Welcome to the interactive dashboard of the Luxembourg
											Cybersecurity Ecosystem. It presents a complete
											overview of all relevant cybersecurity key figures
											in the Grand-Duchy.
										</div>
									</div>
								</div>
							</div>
						</div>

						<img
							src="/img/Skyline.png"
							alt="Skyline Luxembourg"
						/>
					</div>

					<div className="content">
						<Tab
							onMenuClick={(m) => this.setState({ selectedMenu: m })}
							selectedMenu={this.state.selectedMenu}
							labels={["Ecosystem Overview", "Public Sector", "Private Sector"]}
							keys={[0, 1, 2]}
							content={[
								<PageDashboardOverview
									key={0}
									taxonomies={this.props.taxonomies}
									{...this.props}
								/>,
								<PageDashboardPublicSector
									key={1}
									taxonomies={this.props.taxonomies}
									{...this.props}
								/>,
								<PageDashboardPrivateSector
									key={2}
									taxonomies={this.props.taxonomies}
									{...this.props}
								/>,
							]}
						/>
					</div>
				</div>
			</div>
		);
	}
}
