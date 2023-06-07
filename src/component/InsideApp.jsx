import React from "react";
import "./InsideApp.css";
import {
	Route, Switch, Redirect, withRouter,
} from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import GovBar from "./bar/GovBar.jsx";
import Menu from "./bar/Menu.jsx";
import Footer from "./bar/Footer.jsx";
import PageLanding from "./page/PageLanding.jsx";
import PageLatestNews from "./page/PageLatestNews.jsx";
import PageUpcomingEvents from "./page/PageUpcomingEvents.jsx";
import Page404 from "./page/Page404.jsx";

class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			taxonomies: null,
			unlisten: null,
		};
	}

	// eslint-disable-next-line react/no-deprecated
	componentWillMount() {
		this.setState({
			unlisten: this.props.history.listen((location) => {
				// eslint-disable-next-line no-multi-assign,no-underscore-dangle
				const paq = window._paq = window._paq || [];
				paq.push(["setCustomUrl", location.pathname + location.search]);
				paq.push(["trackPageView"]);
			}),
		});
	}

	componentWillUnmount() {
		this.state.unlisten();
	}

	componentDidMount() {
		this.getAnalytics();
	}

	getAnalytics() {
		getRequest.call(this, "public/get_public_analytics", (data) => {
			this.setState({
				taxonomies: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div id="InsideApp">
				<GovBar/>

				<Route path="/:path?" render={(props) => <Menu
					{...props}
				/>}/>

				<div id="InsideApp-content">
					<Switch>
						<Route path="/tool/:handle" render={() => <div/>}/>

						<Route exact path="/" render={(props) => <PageLanding
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/news" render={(props) => <PageLatestNews
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/events" render={(props) => <PageUpcomingEvents
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>

						{/* REDIRECTIONS */}

						<Redirect from="/company/:id" to="/entity/:id" />

						{/* 404 */}

						<Route
							render={(props) => <Page404
								{...props}
							/>}
						/>
					</Switch>
				</div>

				<Footer/>
			</div>
		);
	}
}

export default withRouter(InsideApp);
