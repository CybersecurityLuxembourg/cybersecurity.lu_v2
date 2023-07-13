import React from "react";
import "./PageContact.css";
import BoxWithTitle from "../box/BoxWithTitle.jsx";
import SectionContactForm from "../section/SectionContactForm.jsx";

export default class PageContact extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageContact">
				<SectionContactForm/>

				<div className="max-sized-section">
					<div className="row">
						<div className="offset-md-2 col-md-4">
							<BoxWithTitle
								title={"Email address"}
								content={<div className="row">
									<div className="col-md-12">
										<div>info@cybersecurity.lu</div>
									</div>
								</div>}
							/>
						</div>
						<div className="col-md-4">
							<BoxWithTitle
								title={"Phone"}
								content={<div className="row">
									<div className="col-md-12">
										<div>(+352) 274 00 98 601</div>
									</div>
								</div>}
							/>
						</div>
						<div className="offset-md-4 col-md-4">
							<BoxWithTitle
								title={"Physical address"}
								content={<div className="row">
									<div className="col-md-12">
										<div>Luxembourg House of Cybersecurity</div>
										<div>122 rue Adolphe Fischer</div>
										<div>L-1521 Luxembourg</div>
									</div>
								</div>}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
