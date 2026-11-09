import React from "react";
import "./PageSupportForStartupsLaunchpadTakeOff.css";

const SECTIONS = [
	{
		title: "Accelerators & Incubators",
		cards: [
			{
				icon: "fas fa-shield-alt",
				label: "LUxembourg CYbersecurity Accelerator - LUCYA",
				url: "https://lhc.lu/lucya",
			},
			{
				icon: "fas fa-rocket",
				label: "Fit4Scale",
				url: "https://luxinnovation.lu/assess-and-accelerate/fit4scale",
			},
			{
				icon: "fas fa-lightbulb",
				label: "Technoport",
				url: "https://technoport.lu/",
			},
			{
				icon: "fas fa-city",
				label: "Luxembourg City Incubator",
				url: "https://cityincubator.lu/",
			},
		],
	},
	{
		title: "Investors",
		cards: [
			{
				icon: "fas fa-money-check-alt",
				label: "Venture Capitals",
				url: "https://lpea.lu/",
			},
			{
				icon: "fas fa-handshake",
				label: "Business Angels",
				url: "https://lban.lu/",
			},
		],
	},
	{
		title: "Financial aid",
		cards: [
			{
				icon: "fas fa-search",
				label: "For research and development projects",
				url: "https://guichet.public.lu/en/entreprises/financement-aides/aides-recherche-developpement/rdi/aides-rdi.html",
			},
			{
				icon: "fas fa-chart-line",
				label: "For young innovative enterprises",
				url: "https://guichet.public.lu/en/entreprises/financement-aides/aides-recherche-developpement/rdi/aide-entreprises-innovantes.html",
			},
		],
	},
	{
		title: "Competitions",
		cards: [
			{
				icon: "fas fa-star",
				label: "Fit4Start",
				url: "https://www.startupluxembourg.com/fit-4-start",
			},
			{
				icon: "fas fa-seedling",
				label: "JCI Creative Young Entrepreneur Luxembourg",
				url: "https://cyel.jci.lu/",
			},
			{
				icon: "fas fa-trophy",
				label: "Cybersecurity Startup Award",
				url: "https://cswl.lu/gala",
			},
		],
	},
];

export default class PageSupportForStartupsLaunchpadTakeOff extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageSupportForStartupsLaunchpadTakeOff">
				{SECTIONS.map((s) => (
					<div className="row spaced-row" key={s.title}>
						<div className="col-md-4">
							<div className="title">
								<h6>{s.title}</h6>
							</div>
						</div>

						{s.cards.map((c, i) => (
							<div
								className={"col-md-4" + (i >= 2 ? " card-next-line" : "") + (i > 0 && i % 2 === 0 ? " offset-md-4" : "")}
								key={c.label}>
								<div className="box vertically-centered centered">
									<div className="row">
										<div className="col-md-6 offset-md-3 spaced-row">
											<i className={c.icon}/>
										</div>

										<div className="col-md-8 offset-md-2">
											<div className="h8 spaced-row">
												{c.label}
											</div>
										</div>

										<div className="col-md-12">
											<button
												className="small"
												onClick={() => window.open(c.url, "_blank")}>
												More information
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		);
	}
}
