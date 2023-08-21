import React from "react";
import "./AlertNews.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";
import News from "../item/News.jsx";
import Dialog from "../dialog/Dialog.jsx";

export default class AlertNews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
			show: true,
			sliderSelection: 0,
		};
	}

	componentDidMount() {
		this.getNews();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.getNews();
		}
	}

	getNews() {
		if (this.props.taxonomies
			&& this.props.taxonomies.taxonomy_values) {
			const values = this.props.taxonomies.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "IMPORTANT NEWS");

			if (values.length > 0) {
				const params = {
					type: "NEWS",
					taxonomy_values: values.map((v) => v.id).join(","),
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						news: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					news: { pagination: { total: 0 } },
				});
			}
		}
	}

	getLeftArrowStatus() {
		if (this.state.news?.items
			&& this.state.sliderSelection > 0) {
			return "";
		}

		return "disabled";
	}

	getRightArrowStatus() {
		if (this.state.news?.items
			&& this.state.sliderSelection < this.state.news.items.length - 1) {
			return "";
		}

		return "disabled";
	}

	render() {
		if (this.state.news?.items?.length > 0 && this.state.show) {
			return (
				<div className="AlertNews">
					<div className="row">
						<div className="col-md-10">
							<div className="h8"><i className="fas fa-shield-alt"/>&nbsp;Latest Alerts</div>
						</div>
						<div className="col-md-12">
							<div className="slider">
								<div
									className="slider-left-arrow"
									onClick={() => this.setState(
										{ sliderSelection: this.state.sliderSelection - 1 },
									)}>
									<i className={"fas fa-angle-left " + this.getLeftArrowStatus()}/>
								</div>
								<div className="slider-content">
									{this.state.news?.items[this.state.sliderSelection]?.title !== null
										&& <span>
											{this.state.news.items[this.state.sliderSelection].title}
										</span>
									}
								</div>
								<div
									className="slider-right-arrow"
									onClick={() => this.setState(
										{ sliderSelection: this.state.sliderSelection + 1 },
									)}>
									<i className={"fas fa-angle-right " + this.getRightArrowStatus()}/>
								</div>
							</div>
						</div>
						<div className="col-md-12">
							<div className="right-buttons">
								<Dialog
									trigger={<button className="link small">
										See all alerts &nbsp;<i className="fas fa-arrow-right"/>
									</button>}
									content={<div className="row">
										<div className="col-md-9">
											<h4 className="red"><i className="fas fa-shield-alt"/>&nbsp;Latest Alerts</h4>
										</div>

										{this.state.news.items.map((i) => (
											<div className="col-md-6" key={i.id}>
												<News
													info={i}
												/>
											</div>
										))}
									</div>}
								/>
							</div>
						</div>
					</div>

					<div className="close-button">
						<i
							className="fas fa-times CheckBox-icon"
							onClick={() => this.setState({ show: false })}
						/>
					</div>
				</div>
			);
		}

		return "";
	}
}
