import React from "react";
import "./PageAboutBrandToolkit.css";
import PageAboutBrandToolkitLogo from "./PageAboutLogo.jsx";
import PageAboutBrandToolkitLogoUsage from "./PageAboutLogoUsage.jsx";

export default class PageAboutBrandToolkit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageAboutBrandToolkit">
				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-12">
								<h4>A brand toolkit for all ecosystem members</h4>

								<p>The promotion of the Luxembourg cybersecurity ecosystem is made through
								the national brand <b>“CYBERSECURITY Luxembourg”</b>, intended to enhance and
								structure the promotion of Luxembourg in the field of cybersecurity.</p>

								<p>Learn about the CYBERSECURITY Luxembourg brand guidelines, download
								the logos or use the brand colors.</p>

								<p><b>All members of the Luxembourg cybersecurity ecosystem are invited to
								actively use the CYBERSECURITY Luxembourg brand.</b></p>

								<h5>Download the version of the logo you need:</h5>

								<PageAboutBrandToolkitLogo/>

								<p><b>To have a harmonized and strong identity, please remember
								to use it the right way.</b></p>

								<h5>How to use the logo:</h5>

								<PageAboutBrandToolkitLogoUsage/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
