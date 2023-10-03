import React from "react";
import "./PageSupportForStartupsLaunchpad.css";
import Tab from "../../tab/Tab.jsx";
import PageSupportForStartupsLaunchpadLux from "./PageSupportForStartupsLaunchpadLux.jsx";
import PageSupportForStartupsLaunchpadTakeOff from "./PageSupportForStartupsLaunchpadTakeOff.jsx";
import { getUrlParameter } from "../../../utils/url.jsx";

export default class PageSupportForStartupsLaunchpad extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuLabels: ["Why choosing Luxembourg?", "Ready for take-off"],
			menuValues: ["why-luxembourg", "take-off"],
			selectedMenu: "why-luxembourg",
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
				this.setState({ selectedMenu: "why-luxembourg" });
			}
		}

		if (this.state.selectedMenu !== "why-luxembourg"
			&& !getUrlParameter("tab")) {
			this.setState({ selectedMenu: "why-luxembourg" });
		}
	}

	onMenuClick(m) {
		this.props.history.push("?tab=" + m);
	}

	render() {
		return (
			<div id="PageSupportForStartupsLaunchpad">
				<div className="max-sized-section">
					<div className="row spaced-row">
						<div className="col-md-12 centered spaced-row">
							<h4>Launchpad for your cyber business</h4>
						</div>

						<Tab
							onMenuClick={(m) => this.onMenuClick(m)}
							selectedMenu={this.state.selectedMenu}
							labels={this.state.menuLabels}
							keys={this.state.menuValues}
							content={[
								<PageSupportForStartupsLaunchpadLux
									key={0}
								/>,
								<PageSupportForStartupsLaunchpadTakeOff
									key={1}
								/>,
							]}
						/>
					</div>
				</div>
			</div>
		);
	}
}
