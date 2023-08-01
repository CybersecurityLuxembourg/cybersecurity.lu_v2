import React from "react";
import "./PageAboutLogoUsage.css";

export default class PageAboutLogoUsage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageAboutLogoUsage">
				<div className="resume-section-content">
					<h2 className="mb-5">04. Minimum size</h2>
					<div className="d-flex flex-column flex-md-row justify-content-between mb-5">
						<div className="flex-grow-1">
							<div className="featurette-image img-fluide mx-auto">
								<img src="/img/chart/minimum-size.png" width="400px" alt="Responsive image"/>
							</div>
							<p>The logo must be clearly visible across all the communications. To make sure it
							is visible to everyone, the minimum size for print and digital
							formats has to be respected.</p>
						</div>
					</div>
				</div>

				<div className="resume-section-content">
					<h2 className="mb-5">05. Achromatic &amp; negative</h2>
					<div className="d-flex flex-column flex-md-row justify-content-between mb-5">
						<div className="flex-grow-1">
							<div className="row">
								<div className="col-md-4">
									<div className="featurette-image img-fluide mx-auto">
										<img src="/img/chart/achromatic.png" width="250px" alt="Responsive image"/>
									</div>
								</div>
								<div className="col-md-4">
									<div className="featurette-image img-fluide mx-auto">
										<img src="/img/chart/poz-monochromatic.png" width="250px" alt="Responsive image"/>
									</div>
								</div>
								<div className="col-md-4">
									<div className="featurette-image img-fluide mx-auto">
										<img src="/img/chart/neg-monochromatic.png" width="250px" alt="Responsive image"/>
									</div>
								</div>
							</div>
							<p>Achromatic versions of the logo are allowed alternatively to the standard version.
							</p><p>The grayscale and the monochromatic versions have been specifically
							designed to meet some specific printing requirements.
							</p><p>Where technological limitations do not occur or where conceptual work does
							not say otherwise, the use of the standard version is recommended.</p>
						</div>
					</div>
				</div>

				<div className="resume-section-content">
					<h2 className="mb-5">06. Don&apos;ts</h2>
					<div className="d-flex flex-column flex-md-row justify-content-between mb-5">
						<div className="flex-grow-1">
							<p>It is not allowed to alter the structure, colour, proportions, elements or
							the direction of the logo.
							</p><p>Further it is not allowed to add formulations like:</p>
							<ul>
								<li>with the support of</li>
								<li>sponsored by</li>
								<li>in the frame of</li>
								<li>etc.</li></ul>
							<div className="row">
								<div className="col-md-4">
									<div className="featurette-image-donts img-fluide mx-auto">
										<img src="/img/chart/shadow.png" width="250px" alt="Responsive image"/>
									</div>
								</div>
								<div className="col-md-4">
									<div className="featurette-image-donts img-fluide mx-auto">
										<img src="/img/chart/move.png" width="120px" alt="Responsive image"/>
									</div>
								</div>
								<div className="col-md-4">
									<div className="featurette-image-donts img-fluide mx-auto">
										<img src="/img/chart/stretch.png" width="200px" alt="Responsive image"/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-4">
									<div className="featurette-image-donts img-fluide mx-auto">
										<img src="/img/chart/mix.png" width="250px" alt="Responsive image"/>
									</div>
								</div>
								<div className="col-md-4">
									<div className="featurette-image-donts img-fluide mx-auto">
										<img src="/img/chart/black-dark.png" width="250px" alt="Responsive image"/>
									</div>
								</div>
								<div className="col-md-4">
									<div className="featurette-image-donts img-fluide mx-auto">
										<img src="/img/chart/dark.png" width="250px" alt="Responsive image"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="resume-section-content">
					<h2 className="mb-5">07. Colour codes</h2>
					<div className="d-flex flex-column flex-md-row justify-content-between mb-5">
						<div className="flex-grow-1">
							<div className="row">
								<div className="col-sm-4">
							  <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><rect width="100%" height="100%" fill="#E30613"></rect></svg>
									<ul>
										<li><span>CMYK</span> C0 M100 Y100 K0</li>
										<li><span>Pantone</span> 485
										</li><li><span>RGB</span> R 227 G 006 B 019
										</li><li><span>Hex</span> #E30613</li>
									</ul>
								</div>
								<div className="col-sm-4">
							  <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><rect width="100%" height="100%" fill="#0099FF"></rect></svg>
									<ul>
										<li><span>CMYK</span> C100 M0 Y0 K0</li>
										<li><span>Pantone</span> Process Cyan
										</li><li><span>RGB</span> R 000 G 153 B 255
										</li><li><span>Hex</span> #0099FF</li>
									</ul>
								</div>
								<div className="col-sm-4">
							  <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><rect width="100%" height="100%" fill="#000"></rect></svg>
									<ul>
										<li><span>CMYK</span> C0 M0 Y0 K100</li>
										<li><span>Pantone</span> Process Black
										</li><li><span>RGB</span> R 000 G 000 B 000
										</li><li><span>Hex</span> #000000</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="resume-section-content">
					<h2 className="mb-5">08. The usage</h2>
					<div className="d-flex flex-column flex-md-row justify-content-between mb-5">
						<div className="flex-grow-1">
							<div className="featurette-image img-fluide mx-auto">
								<img src="/img/chart/cybersecurity-logo.jpg" width="400px" alt="Responsive image"/>
							</div>
							<p>The standard logo may be used, in respect with the rules of these guidelines, by
							anyone to brand any publication, event, or any other activity in relation with
							cybersecurity and related to Luxembourg, either in Luxembourg or abroad.</p>
						</div>
					</div>
				</div>

				<div className="resume-section-content">
					<h2 className="mb-5">09. Derivates</h2>
					<div className="d-flex flex-column flex-md-row justify-content-between mb-5">
						<div className="flex-grow-1">
							<div className="featurette-image img-fluide mx-auto">
								<img src="/img/chart/derivate.png" width="600px" className="img-fluid" alt="Responsive image"/>
							</div>
							<p>Only members of the cybersecurity ecosystem are allowed to use the symbol [ <img className="img-fluid" src="/img/chart/symbol-icon.png" width="30px" alt="icon"/> ]  to create a derivate logo for their own events and publications, in respect of the rules described in these guidelines, (i.e. fonts, colour codes restrictions, etc. Before it can be used, the so created “logo” has to be validated by the CYBERSECURITY Luxembourg Committee.
							</p><p>(Find the detailed procedure here: xxx)
							</p><p>The standard CYBERSECURITY Luxembourg logo should be visible on the
							same (web)page, slide, documents etc, as the derivate. Minimum size for the print
							format is 20 mm, for the digital format 100 px.
							</p><p>The symbol alone or derivate logo has to be placed in the header on the
							left side; the standard logo in the footer on the right side.</p>
							<div className="featurette-image img-fluide mx-auto">
								<img src="/img/chart/derivates-position.png" width="600px" className="img-fluid" alt="Responsive image"/>
							</div>
							<h3 className="mb-0">Existing derivates</h3>
							<p>Derivates shown opposite are part of these guidelines. Dates are being updated
							regularly, this does not change the logos.
								All activities and publications branded by a derivate will be communicated on
								CYBERSECURITY Luxembourg websites.
							</p>
							<div className="row-height">
								<div className="col-sm-6">
									<div className="featurette-image img-fluide mx-auto">
										<img src="/img/chart/member.png" height="50px" alt="Responsive image"/>
									</div>
									<p>Members of the cybersecurity ecosystem will get this logo and only they
									are allowed to use it below their signature, in publications, events, on
									visuals and websites as soon as their membership is confirmed.</p>
								</div>
								<div className="col-sm-6">
									<div className="featurette-image img-fluide mx-auto">
										<img src="/img/chart/cyberweek.png" height="50px" alt="Responsive image"/>
									</div>
									<p>Participants of the CYBERSECURITY Week can use the “CSWL logo” in all their
									communications and/or to brand their event during the week.</p>
								</div>
								<div className="w-100"></div>
								<div className="row-height">
									<div className="col-sm-6">
										<div className="featurette-image img-fluide mx-auto">
											<img src="/img/chart/breakfast.png" height="50px" alt="Responsive image"/>
										</div>
										<p>Participants of the Cybersecurity Breakfast  can use the “Breakfast
										logo” for referencing and communication purpose.</p>
									</div>
									<div className="col-sm-6">
										<div className="featurette-image img-fluide mx-auto">
											<img src="/img/chart/newsletter.png" height="50px" alt="Responsive image"/>
										</div>
										<p>Partners mentioned in the monthly newsletter can use the “Newsletter
										logo” for referencing and communication purpose.</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="resume-section-content">
						<h2 className="mb-5">10. Typeface</h2>
						<div className="d-flex flex-column flex-md-row justify-content-between mb-5">
							<div className="flex-grow-1">
								<p>The primary typeface for any printing communication is Proxima Nova. Use the
								Regular weight for standard copy and the Bold weight for anything more
								important than that. For the main headings, we recommend the
								Proxima Nova Bold or Fjalla One.
							For the web, the Open Sans font is recommended.
							Fjalla One can also be used for headlines, quotes or to highlight important ideas for
							both printing and web communication.</p>
								<div className="featurette-image img-fluide mx-auto">
									<img src="/img/chart/typo.png" width="800px" className="img-fluid" alt="Responsive image"/>
								</div>
							</div>
						</div>
					</div>

					<div className="resume-section-content">
						<h2 className="mb-5">11. Stationery</h2>
						<div className="d-flex flex-column flex-md-row justify-content-between mb-5">
							<div className="flex-grow-1">
								<div className="featurette-image img-fluide mx-auto">
									<img src="/img/chart/poster.png" width="800px" className="img-fluid" alt="Responsive image"/>
								</div>
								<div className="featurette-image img-fluide mx-auto">
									<img src="/img/chart/a4.png" width="600px" className="img-fluid" alt="Responsive image"/>
								</div>
								<div className="featurette-image img-fluide mx-auto">
									<img src="/img/chart/enveloppe-brochure.png" width="700px" className="img-fluid" alt="Responsive image"/>
								</div>
							</div>
						</div>
					</div>

					<div className="resume-section-content">
						<h2 className="mb-5">12. Banners</h2>
						<div className="d-flex flex-column flex-md-row justify-content-between mb-5">
							<div className="flex-grow-1">
								<div className="featurette-image img-fluide mx-auto">
									<img src="/img/chart/banners.png" width="700px" className="img-fluid" alt="Responsive image"/>
								</div>
							</div>
						</div>
					</div>

					<div className="resume-section-content">
						<h2 className="mb-5">13. Web</h2>
						<div className="d-flex flex-column flex-md-row justify-content-between mb-5">
							<div className="flex-grow-1">
								<div className="featurette-image img-fluide mx-auto">
									<img src="/img/chart/web.png" width="700px" className="img-fluid" alt="Responsive image"/>
								</div>
							</div>
						</div>
					</div>
				</div></div>
		);
	}
}
