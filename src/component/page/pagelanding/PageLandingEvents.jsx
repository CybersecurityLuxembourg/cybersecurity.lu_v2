import React from "react";
import "./PageLandingEvents.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../../utils/request.jsx";
import { dictToURI } from "../../../utils/url.jsx";
import { dateToString } from "../../../utils/date.jsx";
import EventBig from "../../item/EventBig.jsx";
import Loading from "../../box/Loading.jsx";
import Message from "../../box/Message.jsx";

export default class PageLandingEvents extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: null,
		};
	}

	componentDidMount() {
		this.fetchEvents();
	}

	fetchEvents() {
		const params = dictToURI({
			type: "EVENT",
			include_tags: "true",
			order_by: "start_date",
			order: "asc",
			min_end_date: dateToString(new Date()),
			per_page: 2,
		});

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				events: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"PageLandingEvents"}>
				<div className="max-sized-section text-content">
					<div className="row">
						<div className="col-md-12">
							<h4>Upcoming events</h4>

							<p className="catch-phrase">
								The latest cybersecurity ecosystem events
							</p>
						</div>
					</div>
				</div>

				<div className="max-sized-section">
					<div className="row spaced-row">
						<div className="col-md-6">
							<button
								className="link"
								onClick={() => this.props.history.push("events")}>
								See all events &nbsp;<i className="fas fa-arrow-right"/>
							</button>
						</div>
					</div>

					<div className="row">
						{this.state.events
							&& this.state.events.items.length > 0
							&& this.state.events.items.map((i) => (
								<div className="col-md-6" key={i.id}>
									<EventBig info={i}/>
								</div>
							))
						}

						{this.state.events
							&& this.state.events.items.length === 0
							&& <div className="col-md-12">
								<Message
									height={500}
									text="No event found"
								/>
							</div>
						}

						{!this.state.events
							&& <div className="col-md-12">
								<Loading/>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
