import React from "react";
import "./SectionEvents.css";
import { NotificationManager as nm } from "react-notifications";
import Tab from "../tab/Tab.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";
import Event from "../item/Event.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import DynamicTable from "../table/DynamicTable.jsx";

export default class SectionEvents extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: 0,
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

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomies && this.props.taxonomies) {
			this.fetchEvents();
		}
	}

	fetchEvents(page) {
		if (this.props.taxonomies && this.props.taxonomies.taxonomy_values) {
			this.setState({ events: null }, () => {
				const params = {
					type: "EVENT",
					include_tags: "true",
					taxonomy_values: this.state.selectedMenu >= 2
						? this.props.taxonomies.taxonomy_values
							.filter((v) => v.name === this.state.eventCategories[this.state.selectedMenu])
							.map((v) => v.id).join(",")
						: undefined,
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
			<div className={"SectionEvents"}>
				<Tab
					onMenuClick={(m) => this.onMenuClick(m)}
					selectedMenu={this.state.selectedMenu}
					labels={this.state.eventCategories}
					keys={[0, 1]}
					content={[
						this.buildEventContent(),
						this.buildEventContent(),
					]}
				/>
			</div>
		);
	}
}
