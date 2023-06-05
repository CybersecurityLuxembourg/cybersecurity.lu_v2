import React from "react";
import "./PageLandingContact.css";
import Field from "../../form/Field.jsx";

export default class PageLandingContact extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			topic: "",
			message: "",
		};
	}

	render() {
		return (
			<div id={"PageLandingContact"}>
				<div className="content max-sized-section">
					<div className="skyline">
						<img
							className={"logo"}
							src="/img/skyline.png"
							alt="Skyline Luxembourg"
						/>
					</div>

					<div className="row">
						<div className="col-md-7">
							<div className="box-content">
								<div className="row spaced-row">
									<div className="col-md-12">
										<h4 className="title">
											Contact us
										</h4>

										<p className="catch-phrase">
											Lorem ipsum dolor sit amet consectetur
											adipiscing elit tortor eu dolorol egestas
											morbi sem vulputate etiam facilisis
											pellentesque ut quis.
										</p>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<Field
											label={"Name"}
											value={this.state.name}
											placeholder={"Your name"}
											onChange={(v) => this.setState({ name: v })}
											fullWidth={true}
										/>
									</div>
									<div className="col-md-6">
										<Field
											label={"Email"}
											value={this.state.email}
											placeholder={"example@email.com"}
											onChange={(v) => this.setState({ email: v })}
											fullWidth={true}
										/>
									</div>
									<div className="col-md-12">
										<Field
											label={"Topic"}
											type={"select"}
											placeholder={"Select a topic"}
											options={[
												{ label: "oo", value: "oo" },
												{ label: "aa", value: "aa" },
											]}
											value={this.state.topic}
											onChange={(v) => this.setState({ topic: v })}
											fullWidth={true}
										/>
									</div>
									<div className="col-md-12">
										<Field
											label={"Leave us a message"}
											type="textarea"
											value={this.state.message}
											onChange={(v) => this.setState({ message: v })}
											fullWidth={true}
										/>
									</div>
									<div className="col-md-12">
										<button
											disabled={true}
										>
											Send message
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
