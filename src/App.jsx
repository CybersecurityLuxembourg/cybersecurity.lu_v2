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
import { BrowserRouter } from "react-router-dom";
import InsideApp from "./component/InsideApp.jsx";
import { getApiURL } from "./utils/env.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
			<div id="App">
				<BrowserRouter>
					<InsideApp {...this.props}/>
					<NotificationContainer/>
				</BrowserRouter>
			</div>
		);
	}
}
