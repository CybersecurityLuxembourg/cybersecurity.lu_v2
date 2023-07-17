import React from "react";
import "./PageSupport.css";
import Field from "../form/Field.jsx";
import Entity from "../item/Entity.jsx";

export default class PageSupport extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedValue: 0,
			validatedValue: null,
		};
	}

	componentDidUpdate(_, prevState) {
		if (this.state.validatedValue !== prevState.validatedValue) {
			this.props.history.push("?emergency=" + this.state.validatedValue);
		}
	}

	buildResult() {
		switch (this.state.validatedValue) {
		case 0:
			return <Entity
				info={{
					name: "CIRCL",
					website: "https://circl.lu",
				}}
			/>;
		case 1:
			return "1";
		case 2:
			return "2";
		case 3:
			return "3";
		case 4:
			return "4";
		case 5:
			return "5";
		case 6:
			return "6";
		case 7:
			return "7";
		default:
			return "";
		}
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageSupport"}>
				<div className="max-sized-section">
					<div className="row">
						<div className="col-md-12">
							<div className="immediate-support">
								<div className="row">
									<div className="col-md-12">
										<h2>Immediate support</h2>
									</div>

									<div className="offset-md-3 col-md-6">
										<p>Either you need help, seek guidance or wish
										to discuss a cybersecurity related topic/project, relevant
										experts are there for you.</p>
									</div>

									<div className="offset-md-2 col-md-8">
										<div className="h8">Please select your emergency</div>
									</div>

									<div className="offset-md-2 col-md-6">
										<Field
											label={"Please select your emergency"}
											type={"select"}
											hideLabel={true}
											options={[
												{ label: "I have a question about cybersecurity?", value: 0 },
												{ label: "My equipment is infected and I am looking for support", value: 1 },
												{ label: "I have received a suspicious link/file", value: 2 },
												{ label: "I want to prevent from SPAM and Phishing", value: 3 },
												{ label: "I found illegal content on the Internet, what should I do?", value: 4 },
												{ label: "I have a privacy issue", value: 5 },
												{ label: "I have a dispute with a telecom provider", value: 6 },
												{ label: "Other", value: 7 },
											]}
											value={this.state.selectedValue}
											onChange={(v) => this.setState({ selectedValue: v })}
											fullWidth={true}
										/>
									</div>

									<div className="col-md-2">
										<button
											onClick={() => this.setState({ validatedValue: this.state.selectedValue })}
											disabled={this.state.validatedValue === this.state.selectedValue}>
											Search &nbsp;<i className="fas fa-arrow-right"/>
										</button>
									</div>
								</div>
							</div>

							<div className="col-md-12">
								{this.state.validatedValue !== null
									&& <div className="support-result">
										<h6>Result</h6>

										{this.buildResult()}
									</div>
								}
							</div>
						</div>

						<div className="col-md-12">
							<div className="report">
								<div className="row">
									<div className="col-md-1"/>

									<div className="col-md-5">
										<h4>Report an incident!</h4>

										<p>Incidents can be reported via e-mail or phone. See
										our contact page for details including OpenPGP
										information.</p>

										<button
											className="link"
											onClick={() => window.open(
												"https://circl.lu",
												"_blank",
											)}>
											Report an incident &nbsp;<i className="fas fa-arrow-right"/>
										</button>

										<button
											className="link"
											onClick={() => window.open(
												"https://circl.lu",
												"_blank",
											)}>
											Report an incident &nbsp;<i className="fas fa-arrow-right"/>
										</button>
									</div>

									<div className="col-md-1"/>

									<div className="col-md-3">
										<div className="report-img">
											<img
												src="/img/circl-logo-full-text.png"
												alt="CIRCL Logo"
											/>
										</div>
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
