import React from "react";
import "./PageEducationEducation.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import Entity from "../../item/Entity.jsx";
import Service from "../../item/Service.jsx";
import Message from "../../box/Message.jsx";
import Loading from "../../box/Loading.jsx";

export default class PageEducationEducation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			educationEntities: null,
			educationServices: null,
		};
	}

	componentDidMount() {
		this.fetchEducationEntities();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.fetchEducationEntities();
		}
	}

	fetchEducationEntities() {
		if (this.props.taxonomies) {
			const valueId = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === "EDUCATIONAL INSTITUTION")
				.map((v) => v.id);

			if (valueId.length > 0) {
				this.setState({
					educationEntities: null,
				}, () => {
					getRequest.call(this, "public/get_public_entities"
						+ "?taxonomy_values=" + valueId.join(","), (data) => {
						this.setState({
							educationEntities: data,
						}, () => {
							this.fetchServicesOfEducationEntities();
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				});
			} else {
				this.setState({
					educationEntities: [],
				});
			}
		}
	}

	fetchServicesOfEducationEntities() {
		if (this.state.educationEntities && this.state.educationEntities.length > 0) {
			const params = {
				type: "SERVICE",
				include_tags: true,
				entities: this.state.educationEntities.map((e) => (e.id)),
			};

			getRequest.call(this, "public/get_public_articles?"
				+ dictToURI(params), (data) => {
				this.setState({
					educationServices: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			this.setState({
				educationServices: { pagination: { total: 0 } },
			});
		}
	}

	buildContent() {
		if (!this.state.educationEntities || !this.state.educationServices) {
			return <Loading height={500}/>;
		}

		if (this.state.educationEntities.length === 0) {
			return <Message height={500} text={"No message found"}/>;
		}

		return <div>
			{this.state.educationEntities.map((e) => (
				<div className="education-section" key={e.id}>
					<div className="row">
						<div className="col-md-4">
							<Entity info={e}/>
						</div>

						<div className="col-md-8">
							<div className="row">
								{this.state.educationServices.items
									.filter((s) => s.entity_tags.indexOf(e.id) >= 0)
									.map((s) => (
										<div className="col-md-6" key={s.id}>
											<Service
												info={s}
												taxnomies={this.props.taxnomies}
											/>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			))}

		</div>;
	}

	render() {
		return (
			<div id="PageEducationEducation">
				{this.buildContent()}
			</div>
		);
	}
}
