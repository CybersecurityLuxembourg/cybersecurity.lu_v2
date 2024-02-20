import React from "react";
import "./PageBestPracticeProtectPrevent.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import Tool from "../../item/Tool.jsx";
import SectionPCDoctor from "../../section/SectionPCDoctor.jsx";
import Message from "../../box/Message.jsx";
import Loading from "../../box/Loading.jsx";
import { goToDiv } from "../../../utils/page.jsx";

export default class PageBestPracticeProtectPrevent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tools: {},
			values: [
				"Know the risks",
				"Protect Yourself",
				"Awareness Videos",
			],
			icons: {
				"Tracking": "fas fa-solid fa-location-dot",
				"Mass surveillance": "fa-solid fa-video",
				"Diversion": "fas fa-solid fa-wifi",
				"Information leak": "fas fa-solid fa-microphone",
				"Updates": "fas fa-solid fa-arrows-rotate",
				"Recognised Manufacturer": "fas fa-regular fa-circle-check",
				"Physical security": "fas fa-solid fa-key",
				"Contract": "fas fa-solid fa-file-signature",
				"Device deactivation": "fas fa-solid fa-power-off",
				"Disposal": "fas fa-regular fa-trash-can",
				"Network": "fas fa-solid fa-network-wired",
				"Applications": "fas fa-solid fa-mobile-screen-button",
				"Password": "fas fa-solid fa-unlock-keyhole",
			},
		};
	}

	componentDidMount() {
		this.fetchAllTools();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.fetchAllTools();
		}
	}

	fetchAllTools() {
		for (let i = 0; i < this.state.values.length; i++) {
			this.fetchTools(this.state.values[i]);
		}
	}

	fetchTools(value, page) {
		if (this.props.taxonomies) {
			const tv = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "BEST PRACTICE CATEGORY")
				.filter((v) => v.name === value.toUpperCase())
				.map((v) => v.id);

			if (tv.length > 0) {
				const params = {
					type: "TOOL",
					page: page || 1,
					per_page: 50,
					taxonomy_values: tv,
					include_tags: true,
				};

				getRequest.call(this, "public/get_public_articles?"
					+ dictToURI(params), (data) => {
					this.setState({
						tools: {
							[value]: data,
							...this.state.tools,
						},
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					tools: {
						[value]: null,
						...this.state.tools,
					},
				});
			}
		}
	}

	buildToolSection(v) {
		return <div className="row Tool-section">
			{this.state.tools && this.state.tools[v] && this.state.tools[v].pagination.total > 0
				&& this.state.tools[v].items.map((t) => (
					<div className="col-md-6" key={t.id}>
						<Tool info={t}
							icon={this.state.icons[t.title] || "fas fa-shield-alt"}
							iconColor={t.title === "DON'TS" ? "red" : "blue"}
						/>
					</div>
				))
			}

			{this.state.tools && this.state.tools[v] && this.state.tools[v].pagination.total === 0
				&& <div className="col-md-12">
					<Message
						text={"No tool found"}
						height={300}
					/>
				</div>
			}

			{(!this.state.tools || !this.state.tools[v])
				&& <div className="col-md-12">
					<Loading
						height={300}
					/>
				</div>
			}
		</div>;
	}

	render() {
		return (
			<div id={"PageBestPracticeProtectPrevent"}>
				<div className="row">
					<div className="col-md-3">
						<div className="h8 blue-text uppercase">
							IN THIS SECTION
						</div>

						<div className="menu">
							{this.state.values.map((v, i) => (
								<div
									key={i}
									className={"menu-element" + (i === 0 ? " selected" : "")}
									onClick={() => goToDiv(this.constructor.name + "-" + i)}>
									{v}
								</div>
							))}
						</div>

						<div className="grey-horizontal-bar"/>

						<SectionPCDoctor
							{...this.props}
						/>
					</div>

					<div className="col-md-1"/>

					<div className="col-md-8">
						{this.state.values.map((v, i) => (
							<div className="row" key={v}>
								<div className="col-md-12">
									<h6 id={this.constructor.name + "-" + i}>{v}</h6>
								</div>

								<div className="col-md-12">
									{this.buildToolSection(v)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}
