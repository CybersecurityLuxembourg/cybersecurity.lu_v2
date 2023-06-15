import React from "react";
import "./PageEducationTrainings.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import { getApiURL } from "../../../utils/env.jsx";
import Service from "../../item/Service.jsx";
import Message from "../../box/Message.jsx";
import Loading from "../../box/Loading.jsx";
import Field from "../../form/Field.jsx";

export default class PageEducationTrainings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			entity: null,
			services: null,
			searchValue: null,
		};
	}

	componentDidMount() {
		this.fetchINFPC();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.fetchINFPC();
		}
	}

	fetchINFPC() {
		getRequest.call(this, "public/get_public_entities?name=INFPC", (data) => {
			if (data.length === 0) {
				nm.warning("INFPC entity not found");
			} else if (data.length > 1) {
				nm.warning("Too much entities found for INFPC");
			} else {
				this.setState({
					entity: data[0],
				}, () => {
					this.fetchEducationServices();
				});
			}
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	fetchEducationServices(page) {
		if (this.props.taxonomies) {
			const valueIds = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "SERVICE CATEGORY" && v.name === "TRAINING")
				.map((v) => v.id);

			if (valueIds.length > 0) {
				const params = {
					type: "SERVICE",
					title: this.state.searchValue,
					page: page || 1,
					per_page: 9,
					taxonomy_values: valueIds,
					entities: [this.state.entity.id],
					include_tags: true,
				};

				getRequest.call(this, "public/get_public_articles?"
					+ dictToURI(params), (data) => {
					this.setState({
						services: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					services: { pagination: { total: 0 } },
				});
			}
		}
	}

	buildContent() {
		if (!this.state.entity || !this.state.services) {
			return <Loading height={500}/>;
		}

		if (this.state.services.pagination.total === 0) {
			return <Message height={500} text={"No training found"}/>;
		}

		return <div className="education-section">
			<div className="row">
				{this.state.services.items
					.map((s) => (
						<div className="col-md-4" key={s.id}>
							<Service
								info={s}
							/>
						</div>
					))}
			</div>
		</div>;
	}

	render() {
		return (
			<div id="PageEducationTrainings">
				<div className="training-section top-section">
					<div className="title-section">
						<div className="row">
							<div className="col-md-12">
								<div>In collaboration with the national portal</div>

								{this.state.entity
									&& <img
										src={getApiURL() + "public/get_public_image/" + this.state.entity.image}
									/>
								}
							</div>
						</div>
					</div>

					<div className="col-md-12">
						<Field
							value={this.state.searchValue}
							placeholder={"Search training"}
							onChange={(v) => this.setState({ searchValue: v })}
							fullWidth={true}
						/>
					</div>
				</div>

				<div className="training-section">
					{this.buildContent()}
				</div>
			</div>
		);
	}
}
