import React from "react";
import "./SectionContactForm.css";
import { NotificationManager as nm } from "react-notifications";
import { postRequest } from "../../utils/request.jsx";
import { validateEmail } from "../../utils/re.jsx";
import Field from "../form/Field.jsx";

export default class SectionContactForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			full_name: "",
			email: "",
			topic: null,
			message: "",
		};
	}

	postMessage() {
		const params = {
			full_name: this.state.full_name,
			email: this.state.email,
			message: this.state.message,
			parameters: { topic: this.state.topic },
		};

		postRequest.call(this, "public/add_public_request", params, () => {
			nm.info("The message has been sent");
			this.setState({
				full_name: "",
				email: "",
				topic: "",
				message: "",
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div id={"SectionContactForm"}>
				<div className="content max-sized-section">
					<div className="skyline">
						<img
							className={"logo"}
							src="/img/Skyline.png"
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
										</p>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<Field
											label={"Name"}
											value={this.state.full_name}
											placeholder={"Your name"}
											onChange={(v) => this.setState({ full_name: v })}
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
											format={!this.state.email
												? undefined
												: validateEmail
											}
										/>
									</div>
									<div className="col-md-12">
										<Field
											label={"Topic"}
											type={"select"}
											placeholder={"Select a topic"}
											options={[
												{ label: "--", value: null },
												{ label: "I want to get more information on the ecosystem", value: "I want to get more information on the ecosystem" },
												{ label: "I want to join the ecosystem", value: "I want to join the ecosystem" },
												{ label: "I would like to suggest a new partnership/collaboration", value: "I would like to suggest a new partnership/collaboration" },
												{ label: "I have a technical issue", value: "I have a technical issue" },
												{ label: "I would like to contribute content", value: "I would like to contribute content" },
												{ label: "Other", value: "Other" },
											]}
											value={this.state.topic}
											onChange={(v) => this.setState({ topic: v })}
											fullWidth={true}
										/>
									</div>
									<div className="col-md-12">
										<Field
											label={"Leave us a message"}
											placeholder={"Please type your message here"}
											type="textarea"
											value={this.state.message}
											onChange={(v) => this.setState({ message: v })}
											fullWidth={true}
										/>
									</div>
									<div className="col-md-12">
										<button
											disabled={!this.state.full_name
												|| !this.state.message
												|| !this.state.email
												|| !this.state.topic
												|| !validateEmail(this.state.email)
											}
											onClick={() => this.postMessage()}
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
