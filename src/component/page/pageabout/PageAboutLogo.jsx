import React from "react";
import "./PageAboutLogo.css";

export default class PageAboutLogo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageAboutLogo">
				<div className="resume-section-content">
					<div className="row">
						<div className="col-md-3 offset-md-3">
							<div className="featurette-image img-fluide mx-auto">
								<img src="/img/chart/standard_logo.png" width="400px" alt="Responsive image"/>
							</div>
						</div>
						<div className="col-md-3">
							<div className="vertically-centered">
								<button
									onClick={() => window.open("/img/chart/standard_logo.png")}
									className="small">
									Open image
								</button>
							</div>
						</div>
						<div className="col-md-3 offset-md-3">
							<div className="featurette-image img-fluide mx-auto">
								<img src="/img/chart/standard_logo.png" width="400px" alt="Responsive image"/>
							</div>
						</div>
						<div className="col-md-3">
							<div className="vertically-centered">
								<button
									onClick={() => window.open("/img/chart/standard_logo.png")}
									className="small">
									Open image
								</button>
							</div>
						</div>
						<div className="col-md-3 offset-md-3">
							<div className="featurette-image img-fluide mx-auto">
								<img src="/img/chart/standard_logo.png" width="400px" alt="Responsive image"/>
							</div>
						</div>
						<div className="col-md-3">
							<div className="vertically-centered">
								<button
									onClick={() => window.open("/img/chart/standard_logo.png")}
									className="small">
									Open image
								</button>
							</div>
						</div>
						<div className="col-md-12">
							<p>This is the standard version of the logo.
								The primary background colour is white.
								The positive (standard) version of the logo should always be used.
								However, when the background is the same colour as an element of the
							    logo, the negative (white) version can be used.</p>
						</div>
					</div>
				</div>

				<div className="resume-section-content">
					<div className="row">
						<div className="col-md-6 offset-md-3">
							<div className="featurette-image img-fluide mx-auto">
								<img src="/img/chart/architecture.png" width="400px" alt="Responsive image"/>
							</div>
						</div>
						<div className="col-md-12">
							<p>The logo is a graphic comprised of the wordmark (logotype) and figurative
							mark (symbol).</p>
							<p>The symbol is based on
							the [ <img className="img-fluid in-text" src="/img/chart/icon.png" width="30px" alt="icon"/>  ] of
							the Luxembourg brand.</p>
							<p>In addition, the idea of cybersecurity is illustrated by a shield and a binary
							representation of the number 42 on the left side.</p>
							<p>The lettering is created using the Fjalla One and Verlag typefaces. The complete
							logo shall be used on printing and digital documents. The symbol alone can be used as
							a “reminder” on a document which already contains the complete logo, or on social
							media channels, app’s icons and pins.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
