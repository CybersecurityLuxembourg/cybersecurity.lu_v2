import React from "react";
import "./ChartSolutionStartupHorizontalBar.css";
import {
	Chart as ChartJS, CategoryScale, LinearScale, BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default class ChartSolutionStartupHorizontalBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			valueChainOrder: ["IDENTIFY", "PROTECT", "DETECT", "RESPOND", "RECOVER"],
		};
	}

	// eslint-disable-next-line class-methods-use-this
	getChartData() {
		const distribution = this.getValueChainDistribution();

		if (distribution === null) {
			return { datasets: [] };
		}

		return {
			maintainAspectRatio: false,
			responsive: false,
			labels: this.state.valueChainOrder,
			datasets: [
				{
					label: this.state.valueChainOrder,
					data: this.state.valueChainOrder
						.map((o) => (distribution[o] ? distribution[o] : 0)),
					borderColor: "#E5F5FF",
					backgroundColor: "#E5F5FF",
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

	getValueChainDistribution() {
		const getLeavesOfNode = (taxonomyValues) => {
			if (!this.props.taxonomies) {
				return null;
			}

			const valueIds = [...new Set(taxonomyValues.map((v) => v.id))];

			const childValueIds = this.props.taxonomies.taxonomy_value_hierarchy
				.filter((c) => valueIds.indexOf(c.parent_value) >= 0)
				.map((c) => c.child_value);

			if (childValueIds.length > 0) {
				const childValues = this.props.taxonomies.taxonomy_values
					.filter((v) => childValueIds.indexOf(v.id) >= 0);
				return getLeavesOfNode(childValues);
			}

			return taxonomyValues;
		};

		if (!this.props.taxonomies) {
			return null;
		}

		const distribution = {};

		const values = this.props.taxonomies.taxonomy_values
			.filter((v) => v.category === "VALUE CHAIN");

		for (let i = 0; i < values.length; i++) {
			const leaves = getLeavesOfNode([values[i]]).map((v) => v.id);
			let concernedCompanies = this.props.taxonomies.taxonomy_assignments
				.filter((a) => leaves.indexOf(a.taxonomy_value_id) >= 0)
				.map((a) => a.entity_id);
			concernedCompanies = [...new Set(concernedCompanies)];
			distribution[values[i].name] = concernedCompanies.length;
		}

		return distribution;
	}

	render() {
		return (
			<div className={"ChartSolutionStartupHorizontalBar"}>
				<div className="row">
					<div className="col-md-12">
						<Bar
							data={this.getChartData()}
							options={this.getOptions()}
						/>
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
