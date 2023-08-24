import React from "react";
import "./ChartCreationDateHorizontalBar.css";
import {
	Chart as ChartJS, CategoryScale, LinearScale, BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getPastDate } from "../../utils/date.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default class ChartCreationDateHorizontalBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			labels: [">= 20 years", "15-19 years", "10-14 years", "5-9 years", "< 5 years"],
			ranges: [20, 15, 10, 5, 0],
		};
	}

	// eslint-disable-next-line class-methods-use-this
	getChartData() {
		return {
			maintainAspectRatio: false,
			responsive: false,
			labels: this.state.labels.reverse(),
			datasets: [
				{
					data: this.getData().reverse(),
					backgroundColor: "#E93842",
					hoverBackgroundColor: "#E93842",
				},
			],
		};
	}

	// eslint-disable-next-line class-methods-use-this
	getOptions() {
		return {
			indexAxis: "y",
			legend: {
				display: false,
				position: "right",
			},
			scales: {
				x: {
					grid: {
						drawBorder: false,
						display: false,
					},
					border: {
						display: false,
					},
					ticks: {
						beginAtZero: true,
						precision: 0,
					},
				},
				y: {
					grid: {
						drawBorder: false,
						display: false,
					},
					border: {
						display: false,
					},
				},
			},
			barPercentage: 0.4,
		};
	}

	getData() {
		const data = this.state.ranges.map(() => 0);
		const dates = this.state.ranges.map((o) => getPastDate(o));

		for (let i = 0; i < this.props.serviceProviders.length; i++) {
			for (let y = 0; y < dates.length; y++) {
				if (this.props.serviceProviders[i].creation_date < dates[y]) {
					data[y] += 1;
					break;
				}
			}
		}

		return data;
	}

	render() {
		return (
			<div className={"ChartCreationDateHorizontalBar"}>
				<div className="row">
					<div className="col-md-12">
						{this.props.serviceProviders
							? <Bar
								data={this.getChartData()}
								options={this.getOptions()}
							/>
							: "Loading..."
						}
					</div>
				</div>
			</div>
		);
	}
}
