import React from "react";
import "./ChartCoreBusinessStartupDonut.css";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

export default class ChartCoreBusinessStartupDonut extends React.Component {
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
			labels: ["All startups", "Startups with cybersecurity as core business"],
			datasets: [
				{
					data: [
						this.props.serviceProviders.filter((c) => c.is_startup).length
							- this.props.serviceProviders
								.filter((c) => c.is_cybersecurity_core_business && c.is_startup).length,
						this.props.serviceProviders
							.filter((c) => c.is_cybersecurity_core_business && c.is_startup).length],
					backgroundColor: ["#E5F5FF", "#33ADFF"],
					hoverBackgroundColor: ["#E5F5FF", "#33ADFF"],
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
			<div className={"ChartCoreBusinessStartupDonut"}>
				<div className="row">
					<div className="col-md-5">
						<div className="label">
							Startups have Cybersecurity as their core business
						</div>

						<h3>
							{this.props.serviceProviders
								.filter((c) => c.is_cybersecurity_core_business)
								.filter((c) => c.is_startup)
								.length}
						</h3>
					</div>

					<div className="col-md-7">
						<Doughnut
							data={this.getChartData()}
							options={this.getOptions()}
						/>
						<div className="total-legend">
							<h6>{this.props.serviceProviders.filter((c) => c.is_startup).length}<br/>Startups</h6>
						</div>
					</div>

					<div className="col-md-12">
						<div className="legend">
							<div className="dot" style={{ backgroundColor: "#E5F5FF" }}/>
							<span>All startups</span>
							<div className="dot" style={{ backgroundColor: "#33ADFF" }}/>
							<span>Startups with Cybersecurity as core business</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
