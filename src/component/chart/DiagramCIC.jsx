import React from "react";
import "./DiagramCIC.css";
import { Doughnut } from "react-chartjs-2";

const innerDonutData = {
	datasets: [
		{
			labels: ["ANSSI", "GOVCERT", "CTIE", "NC3", "LHC", "CIRCL"],
			urls: [
				"https://hcpn.gouvernement.lu/fr/service/attributions/missions-nationales/anssi.html",
				"https://www.govcert.lu/",
				"https://ctie.gouvernement.lu/",
				"https://www.nc3.lu/",
				"https://www.lhc.lu/",
				"https://www.circl.lu/",
			],
			data: [10, 10, 10, 10, 10, 10],
			backgroundColor: ["#66C2FF", "#66C2FF", "#66C2FF", "#EE6A71", "#EE6A71", "#EE6A71"],
			borderWidth: 6,
		},
	],
};

const outerDonutData = {
	datasets: [
		{
			labels: [
				"Haut-Commissariat à la Protection National (Chair)",
				"Directorate of Defence, Ministry of Foreign and European Affairs",
				"Service de Renseignement de l'Etat",
				"Ministry of the Economy",
				"Ministry of Foreign and European Affairs",
				"Institut Luxembourgeois de Régulation (ILR)",
				"Service des Médias, de la Connectivité et de la politique numérique (SMC)",
			],
			urls: [
				"https://hcpn.gouvernement.lu/",
				"https://defense.gouvernement.lu/",
				"https://sre.gouvernement.lu/",
				"https://meco.gouvernement.lu/",
				"https://maee.gouvernement.lu/",
				"https://web.ilr.lu/",
				"https://smc.gouvernement.lu/",
			],
			data: [10, 10, 10, 10, 10, 10, 10],
			backgroundColor: [
				"#E5F5FF",
				"#E5F5FF",
				"#E5F5FF",
				"#E5F5FF",
				"#E5F5FF",
				"#E5F5FF",
				"#E5F5FF",
			],
			borderColor: [
				"#CCEBFF",
				"#CCEBFF",
				"#CCEBFF",
				"#CCEBFF",
				"#CCEBFF",
				"#CCEBFF",
				"#CCEBFF",
			],
			borderWidth: 6,
		},
	],
};

const fillText = (ctx, text, x, y, maxWidth, lineHeight) => {
	const words = text.split(" ");
	let line = "";
	let testLine = "";
	const lineArray = [];

	for (let n = 0; n < words.length; n++) {
		testLine += `${words[n]} `;
		const metrics = ctx.measureText(testLine);
		const testWidth = metrics.width;
		if (testWidth > maxWidth && n > 0) {
			lineArray.push([line, x, y]);
			// eslint-disable-next-line no-param-reassign
			y += lineHeight;
			line = `${words[n]} `;
			testLine = `${words[n]} `;
		} else {
			line += `${words[n]} `;
		}
		if (n === words.length - 1) {
			lineArray.push([line, x, y]);
		}
	}

	for (let l = 0; l < lineArray.length; l++) {
		ctx.fillText(lineArray[l][0], lineArray[l][1], lineArray[l][2]
			- ((lineHeight * lineArray.length) / 2));
	}
};

const clickEventHandling = {
	onClick: (event, elements, chart) => {
		if (elements.length > 0) {
			const segmentIndex = elements[0].index;
			const url = chart.data.datasets[0].urls[segmentIndex];

			if (url) {
				window.open(url, "_blank");
			}
		}
	},
	onHover: (event, elements, chart) => {
		// eslint-disable-next-line no-param-reassign, no-unused-expressions
		elements.length > 0 ? chart.canvas.style.cursor = "pointer" : chart.canvas.style.cursor = "default";
	},
};

const labelPluginOuter = (chart) => {
	// eslint-disable-next-line prefer-destructuring
	const ctx = chart.ctx;
	chart.data.datasets.forEach((dataset, datasetIndex) => {
		const meta = chart.getDatasetMeta(datasetIndex);
		meta.data.forEach((element, index) => {
			// Draw the label (label + value) on top of the doughnut chart
			const data = dataset.data[index];
			if (data !== 0) {
				const value = `${dataset.labels[index]}`;
				const fontSize = element.x / 18;
				ctx.fillStyle = "black"; // Label text color
				ctx.font = "700 " + fontSize + "px Open Sans"; // Label font size and family
				ctx.textAlign = "center";
				ctx.cursor = "pointer";
				const radius = element.outerRadius * 0.75;
				// eslint-disable-next-line no-underscore-dangle
				const posX = (element.x + radius * Math.cos(0.5 * (element.startAngle + element.endAngle)));
				// eslint-disable-next-line no-underscore-dangle
				const posY = element.y + 12 + radius
					* Math.sin(0.5 * (element.startAngle + element.endAngle));
				fillText(ctx, value, posX, posY, element.x / 2, fontSize + 4);
			}
		});
	});
};

const labelPluginInner = (chart) => {
	// eslint-disable-next-line prefer-destructuring
	const ctx = chart.ctx;
	chart.data.datasets.forEach((dataset, datasetIndex) => {
		const meta = chart.getDatasetMeta(datasetIndex);
		meta.data.forEach((element, index) => {
			// Draw the label (label + value) on top of the doughnut chart
			const data = dataset.data[index];
			if (data !== 0) {
				const value = `${dataset.labels[index]}`;
				ctx.fillStyle = "white";
				ctx.font = "13px Open Sans";
				ctx.cursor = "pointer";
				const text = ctx.measureText(value);
				const radius = element.outerRadius * 0.75;
				// eslint-disable-next-line no-underscore-dangle
				const posX = (element.x + radius * Math.cos(0.5 * (element.startAngle + element.endAngle)))
					- (text.width / 2);
				// eslint-disable-next-line no-underscore-dangle
				const posY = element.y + 6 + radius
					* Math.sin(0.5 * (element.startAngle + element.endAngle));
				ctx.fillText(value, posX, posY);
			}
		});
	});
};

const DiagramCIC = () => (
	<div className="DiagramCIC">
		<div className="donut-chart-inner">
			<Doughnut
				data={innerDonutData}
				plugins={[{
					afterDraw: labelPluginInner,
				}]}
				options={{
					maintainAspectRatio: true,
					aspectRatio: 1,
					responsive: true,
					rotation: -90,
					onClick: clickEventHandling.onClick,
					onHover: clickEventHandling.onHover,
				}}
				id="innerDonut"
			/>
		</div>
		<div className="donut-chart-outer">
			<Doughnut
				data={outerDonutData}
				plugins={[{
					afterDraw: labelPluginOuter,
				}]}
				options={{
					maintainAspectRatio: true,
					aspectRatio: 1,
					responsive: true,
					onClick: clickEventHandling.onClick,
					onHover: clickEventHandling.onHover,
				}}
				id="outerDonut"
			/>
		</div>

		<img src="/img/logo-cyberlux.png"/>
	</div>
);

export default DiagramCIC;
