import React from "react";
import "./App.css";
import "./css/button.css";
import "./css/field.css";
import "./css/breadcrumb.css";
import "./css/box.css";
import "./css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import InsideApp from "./component/InsideApp.jsx";
import { getApiURL } from "./utils/env.jsx";

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	// eslint-disable-next-line class-methods-use-this
	componentDidMount() {
		document.getElementById("favicon").href = getApiURL() + "public/get_public_image/favicon.ico";
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/.well-known/security.txt" />
					<Route>
						<div id="App">
							<InsideApp {...this.props} />
							<NotificationContainer />
						</div>
					</Route>
				</Switch>
			</BrowserRouter>
		);
	}
}
