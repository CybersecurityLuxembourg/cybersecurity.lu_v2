import React from "react";
import "./SectionEvents.css";
import { NotificationManager as nm } from "react-notifications";
import Tab from "../tab/Tab.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI, getUrlParameter } from "../../utils/url.jsx";
import Event from "../item/Event.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class SectionEvents extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: getUrlParameter("tab") !== "past" ? "UPCOMING EVENTS" : "PAST EVENTS",
			eventCategories: [
				"UPCOMING EVENTS",
				"PAST EVENTS",
			],
			events: null,
		};
	}

	componentDidMount() {
		this.fetchEvents();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.fetchEvents();
		}

		if (this.state.selectedMenu !== prevState.selectedMenu) {
			this.props.history.push(this.state.selectedMenu === "PAST EVENTS" ? "?tab=past" : "?");
		}

		if ((this.state.selectedMenu === "UPCOMING EVENTS" && getUrlParameter("tab") === "past")
			|| (this.state.selectedMenu === "PAST EVENTS" && getUrlParameter("tab") !== "past")) {
			this.setState({ selectedMenu: getUrlParameter("tab") !== "past" ? "UPCOMING EVENTS" : "PAST EVENTS" });
		}
	}

	fetchEvents(page) {
		if (this.props.taxonomies && this.props.taxonomies.taxonomy_values) {
			this.setState({ events: null }, () => {
				const params = {
					type: "EVENT",
					include_tags: "true",
					order_by: "start_date",
					order: this.state.selectedMenu === "UPCOMING EVENTS" ? "asc" : "desc",
					min_end_date: this.state.selectedMenu === "UPCOMING EVENTS" ? dateToString(new Date()) : undefined,
					max_start_date: this.state.selectedMenu === "UPCOMING EVENTS" ? undefined : dateToString(new Date()),
					per_page: this.props.numberOfArticles,
					page: page || 1,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						events: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			});
		}
	}

	buildEventContent() {
		if (this.state.events
			&& this.state.events.pagination) {
			if (this.state.events.pagination.total > 0) {
				return <div className="row">
					<DynamicTable
						items={this.state.events.items}
						pagination={this.state.events.pagination}
						changePage={(page) => this.fetchEvents(page)}
						buildElement={(s) => <div
							className="col-md-4"
							key={s.id}>
							<Event
								info={s}
							/>
						</div>
						}
					/>
				</div>;
			}

			return <Message
				height={500}
				text="No event found"
			/>;
		}

		return <Loading height={500}/>;
	}

	onMenuClick(menu) {
		this.setState({ selectedMenu: menu }, () => {
			this.fetchEvents();
		});
	}

	render() {
		return (
			<div id={"SectionEvents"} className={"SectionEvents"}>
				<Tab
					onMenuClick={(m) => this.onMenuClick(m)}
					selectedMenu={this.state.selectedMenu}
					labels={this.state.eventCategories}
					keys={this.state.eventCategories}
					content={[
						this.buildEventContent(),
						this.buildEventContent(),
					]}
				/>
			</div>
		);
	}
}
