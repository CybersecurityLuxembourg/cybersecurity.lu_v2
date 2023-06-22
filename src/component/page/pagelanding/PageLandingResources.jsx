import React from "react";
import "./PageLandingResources.css";
import BoxReadMore from "../../box/BoxReadMore.jsx";

export default class PageLandingResources extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageLandingResources"}>
				<div className="text-content">
					<div className="mid-sized-section">
						<div className="row">
							<div className="col-md-12">
								<h4>Education, resources & opportunities</h4>
							</div>
						</div>
					</div>
				</div>

				<div className="box-content">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-4">
								<BoxReadMore
									{...this.props}
									title={"Tips & best practices"}
									abstract={""}
									link={"best-practice"}
									image={"/img/icon-shield.png"}
								/>
							</div>
							<div className="col-md-4">
								<BoxReadMore
									{...this.props}
									title={"Norms, Rules & Laws"}
									abstract={""}
									link={"legal"}
									image={"/img/icon-hammer.png"}
								/>
							</div>
							<div className="col-md-4">
								<BoxReadMore
									{...this.props}
									title={"Jobs & Internships"}
									abstract={""}
									link={"jobs"}
									image={"/img/icon-case.png"}
								/>
							</div>
							<div className="col-md-4">
								<BoxReadMore
									{...this.props}
									title={"Support for Startups"}
									abstract={""}
									link={"support-for-startups"}
									image={"/img/icon-rocket.png"}
								/>
							</div>
							<div className="col-md-4">
								<BoxReadMore
									{...this.props}
									title={"Education & Skills"}
									abstract={""}
									link={"education"}
									image={"/img/icon-hat.png"}
								/>
							</div>
							<div className="col-md-4">
								<BoxReadMore
									{...this.props}
									title={"Publications Library"}
									abstract={""}
									link={"publications"}
									image={"/img/icon-book.png"}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
