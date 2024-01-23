import React from "react";
import "./PopupNews.css";

export default class PopupNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: true,
		};
	}

	render() {
		if (this.state.show) {
			return (
				<div className={"PopupNews"}>
					<div className="row">
						<div className="col-md-10">
							<div className="h8"><i className="fas fa-tv"/>&nbsp;ICRC Symposium</div>
						</div>
						<div className="col-md-12 mt-3">
							Follow the livestream of the Opening & Closing sessions of the ICRC Symposium here
						</div>
						<div className="col-md-12">
							<div className="right-buttons">
								<button
									className="link small"
									onClick={() => window.open(
										"https://www.cybersecurity.lu/news/follow-the-livestream-of-the-international-red-cross-committee-symposium",
										"_blank",
									)}>
									Go to the livestream &nbsp;<i className="fas fa-arrow-right"/>
								</button>
							</div>
						</div>
					</div>

					<div className="close-button">
						<i
							className="fas fa-times CheckBox-icon"
							onClick={() => this.setState({ show: false })}
						/>
					</div>
				</div>
			);
		}

		return "";
	}
}
