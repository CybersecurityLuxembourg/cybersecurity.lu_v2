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
					data: [
						this.props.serviceProviders.length
							- this.props.serviceProviders.filter((c) => c.is_cybersecurity_core_business).length,
						this.props.serviceProviders.filter((c) => c.is_cybersecurity_core_business).length],
					backgroundColor: ["#FCE6E7", "#E93842"],
					hoverBackgroundColor: ["#FCE6E7", "#E93842"],
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
							{this.props.serviceProviders.filter((c) => c.is_cybersecurity_core_business).length}
						</h3>
					</div>

					<div className="col-md-7">
						<Doughnut
							data={this.getChartData()}
							options={this.getOptions()}
						/>
						<div className="total-legend">
							<h6>{this.props.serviceProviders.length}<br/>Companies</h6>
						</div>
					</div>

					<div className="col-md-12">
						<div className="legend">
							<div className="dot" style={{ backgroundColor: "#FCE6E7" }}/>
							<span>All companies</span>
							<div className="dot" style={{ backgroundColor: "#E93842" }}/>
							<span>Companies with Cybersecurity as core business</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
