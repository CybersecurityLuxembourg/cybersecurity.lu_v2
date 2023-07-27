import React from "react";
import "./PageJobsJobs.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import { getApiURL } from "../../../utils/env.jsx";
import Job from "../../item/Job.jsx";
import Message from "../../box/Message.jsx";
import Loading from "../../box/Loading.jsx";
import Field from "../../form/Field.jsx";
import DynamicTable from "../../table/DynamicTable.jsx";

export default class PageJobsJobs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			entity: null,
			jobs: null,
			searchValue: "",
		};
	}

	componentDidMount() {
		this.fetchMoovijob();
		this.fetchJobs();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.fetchMoovijob();
			this.fetchJobs();
		}

		if (this.state.searchValue !== prevState.searchValue) {
			this.fetchJobs();
		}
	}

	fetchMoovijob() {
		if (this.props.taxonomies) {
			getRequest.call(this, "public/get_public_entities?name=Moovijob", (data) => {
				if (data.length === 0) {
					nm.warning("Moovijob entity not found");
				} else if (data.length > 1) {
					nm.warning("Too much entities found for Moovijob");
				} else {
					this.setState({
						entity: data[0],
					});
				}
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	fetchJobs(page) {
		if (this.props.taxonomies) {
			const params = {
				type: "JOB OFFER",
				title: this.state.searchValue,
				ignored_taxonomy_values: this.props.taxonomies.taxonomy_values
					.filter((v) => v.category === "JOB OFFER CATEGORY")
					.filter((v) => v.name === "INTERNSHIP")
					.map((v) => v.id),
				page: page || 1,
				per_page: 9,
				include_tags: true,
			};

			getRequest.call(this, "public/get_public_articles?"
				+ dictToURI(params), (data) => {
				this.setState({
					jobs: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	buildContent() {
		if (!this.state.jobs) {
			return <Loading height={500}/>;
		}

		if (this.state.jobs.pagination.total === 0) {
			return <Message height={500} text={"No job found"}/>;
		}

		return <div className="education-section">
			<div className="row">
				<DynamicTable
					items={this.state.jobs.items}
					pagination={this.state.jobs.pagination}
					changePage={(page) => this.fetchJobs(page)}
					buildElement={(s) => <div
						className="col-md-4"
						key={s.id}>
						<Job
							info={s}
						/>
					</div>
					}
				/>
			</div>
		</div>;
	}

	render() {
		return (
			<div id="PageJobsJobs">
				<div className="training-section top-section">
					<div className="title-section">
						<div className="row">
							<div className="col-md-12">
								<div>In collaboration with</div>

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
							placeholder={"Search job"}
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
