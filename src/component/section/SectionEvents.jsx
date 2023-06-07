import React from "react";
import "./SectionEvents.css";
import { NotificationManager as nm } from "react-notifications";
import Tab from "../tab/Tab.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";
import Event from "../item/Event.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";

export default class SectionEvents extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
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

	fetchEvents() {
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
					page: this.state.page,
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
					{this.state.events.items.map((i) => (
						<div className="col-md-4" key={i.id}>
							<Event info={i}/>
						</div>
					))}
					<div className="col-md-12">
						showPagination TODO
					</div>
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
