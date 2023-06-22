import React from "react";
import "./ChartCoreBusinessDonut.css";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

export default class ChartCoreBusinessDonut extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	getChartData() {
		return {
			maintainAspectRatio: false,
			responsive: false,
			labels: ["All companies", "Companies with cybersecurity as core business"],
			datasets: [
				{
					data: [93, 210],
					backgroundColor: ["#E93842", "#FCE6E7"],
					hoverBackgroundColor: ["#E93842", "#FCE6E7"],
				},
			],
		};
	}

	// eslint-disable-next-line class-methods-use-this
	getOptions() {
		return {
			cutout: "90%",
			legend: {
				display: false,
				position: "right",
			},
		};
	}

	render() {
		return (
			<div className={"ChartCoreBusinessDonut"}>
				<div className="row">
					<div className="col-md-5">
						<div className="label">
							Companies have Cybersecurity as their core business
						</div>

						<h3>
							93
						</h3>
					</div>

					<div className="col-md-7">
						<Doughnut
							data={this.getChartData()}
							options={this.getOptions()}
						/>
					</div>

					<div className="col-md-12">
						<div className="legend">
							<div className="dot" style={{ backgroundColor: "#FCE6E7" }}/>
							<span>All companies</span>
							<div className="dot" style={{ backgroundColor: "#E93842" }}/>
							<span>Companies with Cybersecurity as core buisiness</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
