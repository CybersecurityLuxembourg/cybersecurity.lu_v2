import React from "react";
import "./PageSupport.css";
import { NotificationManager as nm } from "react-notifications";
import Field from "../form/Field.jsx";
import Entity from "../item/Entity.jsx";
import Service from "../item/Service.jsx";
import Tool from "../item/Tool.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { getRequest } from "../../utils/request.jsx";

export default class PageSupport extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedValue: 0,
			validatedValue: null,

			entities: null,
			articles: null,

			entityPerQuestion: {
				0: ["(NC3)", "BEE SECURE"],
				1: ["(CIRCL)"],
				2: [],
				3: ["SPAMBEE"],
				4: [],
				5: ["(CNPD)"],
				6: ["(ILR)"],
				7: ["(LHC)"],
			},
			articlePerQuestion: {
				0: [],
				1: [],
				2: ["URL Abuse", "Pandora"],
				3: [],
				4: ["BEE SECURE STOPLINE"],
				5: [],
				6: [],
				7: [],
			},
		};
	}

	componentDidUpdate(_, prevState) {
		if (this.state.validatedValue !== prevState.validatedValue) {
			this.props.history.push("?emergency=" + this.state.validatedValue);

			this.setState({
				entities: null,
				articles: null,
			}, () => {
				this.fetchAllEntities();
				this.fetchAllArticles();
			});
		}
	}

	fetchAllEntities() {
		if (this.state.entityPerQuestion[this.state.validatedValue] === null) {
			return;
		}

		if (this.state.entityPerQuestion[this.state.validatedValue].length === 0) {
			this.setState({ entities: [] });
		}

		Promise.all(
			this.state.entityPerQuestion[this.state.validatedValue]
				.map((v) => this.fetchEntities(v)),
		).then((results) => {
			if (results.filter((r) => r === null).length > 0) {
				return;
			}

			if (results.filter((r) => r.length === 0).length > 0) {
				nm.warning("Some of the result has not been found. Please contact administrators");
			}

			if (results.filter((r) => r.length > 1).length > 0) {
				nm.warning("Too much results found. Please contact administrators");
				return;
			}

			this.setState({ entities: results.flat() });
		});
	}

	fetchAllArticles() {
		if (this.state.articlePerQuestion[this.state.validatedValue] === null) {
			return;
		}

		if (this.state.articlePerQuestion[this.state.validatedValue].length === 0) {
			this.setState({ articles: [] });
		}

		Promise.all(
			this.state.articlePerQuestion[this.state.validatedValue]
				.map((v) => this.fetchArticles(v)),
		).then((results) => {
			if (results.filter((r) => r === null).length > 0) {
				return;
			}

			if (results.filter((r) => r.length === 0).length > 0) {
				nm.warning("Some of the result has not been found. Please contact administrators");
			}

			if (results.filter((r) => r.length > 1).length > 0) {
				nm.warning("Too much results found. Please contact administrators");
				return;
			}

			this.setState({ articles: results.flat() });
		});
	}

	fetchEntities(name) {
		return new Promise((resolve) => {
			getRequest.call(this, "public/get_public_entities?name=" + name, (data) => {
				resolve(data);
			}, (response) => {
				resolve(null);
				nm.warning(response.statusText);
			}, (error) => {
				resolve(null);
				nm.error(error.message);
			});
		});
	}

	fetchArticles(title) {
		return new Promise((resolve) => {
			getRequest.call(this, "public/get_public_articles?type=SERVICE,TOOL&title=" + title, (data) => {
				resolve(data.items);
			}, (response) => {
				resolve(null);
				nm.warning(response.statusText);
			}, (error) => {
				resolve(null);
				nm.error(error.message);
			});
		});
	}

	buildResult() {
		return <div className="row">
			{!this.state.entities && !this.state.articles
				&& <div className="col-md-12">
					<Loading
						height={300}
					/>
				</div>
			}

			{this.state.entities && this.state.entities.length === 0
				&& this.state.articles && this.state.articles.length === 0
				&& <div className="col-md-12">
					<Message
						text={"No result found. Please contact administrators"}
						height={300}
					/>
				</div>
			}

			{this.state.entities && this.state.entities.length > 0
				&& <div className="col-md-12">
					<div className="row">
						{this.state.entities.map((e) => (
							<div className="col-md-4" key={e.id}>
								<Entity
									info={e}
									showAddress={true}
									showSocials={true}
									showWebsite={true}
								/>
							</div>
						))}
					</div>
				</div>
			}

			{this.state.articles && this.state.articles.length > 0
				&& <div className="col-md-12">
					<div className="row">
						{this.state.articles.map((s) => (
							<div className="col-md-4" key={s.id}>
								{s.type === "SERVICE"
									&& <Service
										info={s}
									/>
								}

								{s.type === "TOOL"
									&& <Tool
										info={s}
									/>
								}
							</div>
						))}
					</div>
				</div>
			}
		</div>;
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
