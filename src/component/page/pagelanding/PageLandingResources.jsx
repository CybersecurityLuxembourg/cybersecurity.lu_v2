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

								<p className="catch-phrase">
									Lorem ipsum dolor sit amet consectetur. Et ornare
									posuere quisque morbi egestas convallis. Adipiscing
									non enim aliquet
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="box-content">
					<div className="max-sized-section">
						<div className="row">
							<div className="col-md-4">
								<BoxReadMore
									title={"Tips & best practices"}
									abstract={"Lorem ipsum dolor sit amet consectetur. Et ornare posuere quisque morbi egestas convallis. "}
									link={""}
									image={""}
								/>
							</div>
							<div className="col-md-4">
								<BoxReadMore
									title={"Tips & best practices"}
									abstract={"Lorem ipsum dolor sit amet consectetur. Et ornare posuere quisque morbi egestas convallis. "}
									link={""}
									image={""}
								/>
							</div>
							<div className="col-md-4">
								<BoxReadMore
									title={"Tips & best practices"}
									abstract={"Lorem ipsum dolor sit amet consectetur. Et ornare posuere quisque morbi egestas convallis. "}
									link={""}
									image={""}
								/>
							</div>
							<div className="col-md-4">
								<BoxReadMore
									title={"Tips & best practices"}
									abstract={"Lorem ipsum dolor sit amet consectetur. Et ornare posuere quisque morbi egestas convallis. "}
									link={""}
									image={""}
								/>
							</div>
							<div className="col-md-4">
								<BoxReadMore
									title={"Tips & best practices"}
									abstract={"Lorem ipsum dolor sit amet consectetur. Et ornare posuere quisque morbi egestas convallis. "}
									link={""}
									image={""}
								/>
							</div>
							<div className="col-md-4">
								<BoxReadMore
									title={"Tips & best practices"}
									abstract={"Lorem ipsum dolor sit amet consectetur. Et ornare posuere quisque morbi egestas convallis. "}
									link={""}
									image={""}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
