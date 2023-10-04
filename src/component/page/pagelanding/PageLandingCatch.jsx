import React from "react";
import "./PageLandingCatch.css";
import AlertNews from "../../box/AlertNews.jsx";

export default class PageLandingCatch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageLandingCatch"}>
				<div className="content max-sized-section">
					<div className="row">
						<div className="col-md-7">
							<h2 className="title">
								The national cybersecurity portal, for everyone
							</h2>

							<p className="catch-phrase">
								All in one place, explore & be a part of this
								community-driven platform whether you are a
								seasoned pro or just starting out.
							</p>
						</div>

						<div className="col-md-1"/>

						<div className="col-md-3">
							<div className="buttons">
								<button
									onClick={() => this.props.history.push("ecosystem")}>
									The Ecosystem
								</button>
								<button
									className="white"
									onClick={() => this.props.history.push("support")}>
									How can we help?
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="alert-container">
					<div className="alert-wrapper">
						<AlertNews
							taxonomies={this.props.taxonomies}
						/>
					</div>
				</div>

				<div className="skyline">
					<img
						className={"logo"}
						src="/img/Skyline.svg"
						alt="Skyline Luxembourg"
					/>
				</div>
			</div>
		);
	}
}
