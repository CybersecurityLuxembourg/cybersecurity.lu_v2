import React from "react";
import "./PageJobsJobs.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import { getApiURL, getJobsMiddlewareURL } from "../../../utils/env.jsx";
import Job from "../../item/Job.jsx";
import Message from "../../box/Message.jsx";
import Loading from "../../box/Loading.jsx";
import Field from "../../form/Field.jsx";
import DynamicTable from "../../table/DynamicTable.jsx";

export default class PageJobsJobs extends React.Component {
	static augmentMoovijobItems(items) {
		if (!Array.isArray(items)) {
			return [];
		}

		return items.map((item) => ({
			...item,
			source: item.source || "moovijobs",
			sourceLabel: item.sourceLabel || "Moovijobs",
		}));
	}

	constructor(props) {
		super(props);

		this.state = {
			entity: null,
			jobs: null,
			searchValue: "",
			cyberrJobs: [],
			cyberrLoading: false,
		};
	}

	componentDidMount() {
		this.fetchMoovijob();
		this.fetchJobs();
		this.fetchCyberrJobs();
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
				const augmentedItems = PageJobsJobs.augmentMoovijobItems(data.items);
				this.setState({
					jobs: {
						...data,
						items: augmentedItems,
					},
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	fetchCyberrJobs() {
		const baseUrl = getJobsMiddlewareURL();

		if (!baseUrl) {
			this.setState({ cyberrJobs: [], cyberrLoading: false });
			return;
		}

		this.setState({ cyberrLoading: true });

		const normalizedBase = baseUrl.replace(/\/?$/, "");
		const url = `${normalizedBase}/jobs?countries=LU&countries=FR&limit=100&offset=0`;

		fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		}).then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText || "Failed fetching jobs from middleware");
			}
			return response.json();
		}).then((jsonBody) => {
			const jobs = (jsonBody?.data?.jobs || []).map((job) => ({
				id: `cyberr-${job.id || job.url}`,
				title: job.title,
				publication_date: job.publishedAt,
				link: job.url,
				handle: job.id || job.url,
				source: "cyberr",
				sourceLabel: "Cyberr",
				excerpt: job.excerpt,
				companyName: job.companyName,
			}));

			this.setState({
				cyberrJobs: jobs,
				cyberrLoading: false,
			});
		}).catch((error) => {
			nm.warning(error.message || "An error occurred while fetching Cyberr jobs");
			this.setState({
				cyberrJobs: [],
				cyberrLoading: false,
			});
		});
	}

	getFilteredCyberrJobs() {
		if (!Array.isArray(this.state.cyberrJobs) || this.state.cyberrJobs.length === 0) {
			return [];
		}

		if (!this.state.searchValue || this.state.searchValue.length < 1) {
			return this.state.cyberrJobs;
		}

		const query = this.state.searchValue.toLowerCase();
		return this.state.cyberrJobs.filter((job) => {
			const searchableFields = [job.title, job.companyName, job.excerpt];
			return searchableFields.some((field) => typeof field === "string"
				&& field.toLowerCase().includes(query));
		});
	}

	getCombinedJobs() {
		if (!this.state.jobs) {
			return null;
		}

		const baseItems = Array.isArray(this.state.jobs.items) ? this.state.jobs.items : [];
		const filteredCyberrJobs = this.getFilteredCyberrJobs();
		const includeCyberr = this.state.jobs?.pagination?.page === 1;
		const combinedItems = includeCyberr ? [...filteredCyberrJobs, ...baseItems] : baseItems;
		const basePagination = this.state.jobs.pagination || {};
		const basePerPage = basePagination.per_page || baseItems.length;
		const combinedPerPage = includeCyberr ? basePerPage + filteredCyberrJobs.length : basePerPage;

		const combinedPagination = {
			...basePagination,
			per_page: combinedPerPage,
			total: (basePagination.total || baseItems.length)
				+ (includeCyberr ? filteredCyberrJobs.length : 0),
			pages: basePagination.pages,
			page: basePagination.page || 1,
		};

		if (!combinedPagination.pages) {
			combinedPagination.pages = 1;
		}

		return {
			items: combinedItems,
			pagination: combinedPagination,
		};
	}

	buildContent() {
		if (!this.state.jobs) {
			return <Loading height={500}/>;
		}

		const combinedJobs = this.getCombinedJobs();

		if (!combinedJobs || combinedJobs.items.length === 0) {
			return <Message height={500} text={"No job found"}/>;
		}

		return <div className="education-section">
			<div className="row">
				{this.state.cyberrLoading
					&& <div className="col-md-12">
						<div className="cyberr-sync-banner">Refreshing Cyberr jobs…</div>
					</div>
				}

				<DynamicTable
					items={combinedJobs.items}
					pagination={combinedJobs.pagination}
					changePage={(page) => this.fetchJobs(page)}
					buildElement={(s) => (
						<div
							className="col-md-4"
							key={s.id}>
							<Job
								info={s}
							/>
						</div>
					)}
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
								<div className="collaboration-details">
									<div className="collaboration-text">
										In collaboration with Moovijob and Cyberr
									</div>

									{this.state.entity && (
										<img
											src={getApiURL() + "public/get_public_image/" + this.state.entity.image}
											alt="Moovijob"
										/>
									)}

									<div className="collaboration-badge">Cyberr</div>
								</div>
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
