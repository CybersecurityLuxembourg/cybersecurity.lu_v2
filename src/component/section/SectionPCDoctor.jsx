import React from "react";
import "./SectionPCDoctor.css";

export default class SectionPCDoctor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"SectionPCDoctor"}>
				<div className="row">
					<div className="col-md-12">
						<div className="text-content">
							<div>
								<div className="blue-text"><b>Do you suspect a problem? Contact a PC DOCTORS</b></div>

								<img
									src="/img/icon-shield-lock.png"
									alt="Shield shaped lock"
								/>

								<p>
									PC DOCTORS are companies that offer cybersecurity services and
									support to individuals and small businesses in Luxembourg.
								</p>

								<button
									className="small"
									onClick={() => this.props.history.push("/ecosystem?tab=private-sector&pcdoctor_only=true")}
								>
									See the full list &nbsp;<i className="fas fa-arrow-right"/>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
