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
import PageDashboard from "./page/PageDashboard.jsx";
import PagePrivateSector from "./page/PagePrivateSector.jsx";
import PageStartups from "./page/PageStartups.jsx";
import PagePcDoctors from "./page/PagePcDoctors.jsx";
import PagePublicSector from "./page/PagePublicSector.jsx";
import PageInitiatives from "./page/PageInitiatives.jsx";
import PageLatestNews from "./page/PageLatestNews.jsx";
import PageUpcomingEvents from "./page/PageUpcomingEvents.jsx";
import PageGetInvolved from "./page/PageGetInvolved.jsx";
import PageEducation from "./page/PageEducation.jsx";
import PageLifelongLearning from "./page/PageLifelongLearning.jsx";
import PageJobs from "./page/PageJobs.jsx";
import PageInternships from "./page/PageInternships.jsx";
import PageBestPractice from "./page/PageBestPractice.jsx";
import PageLegal from "./page/PageLegal.jsx";
import PageStandards from "./page/PageStandards.jsx";
import PagePublications from "./page/PagePublications.jsx";
import PageSupportForStartups from "./page/PageSupportForStartups.jsx";
import PageFunding from "./page/PageFunding.jsx";
import PageScholarships from "./page/PageScholarships.jsx";
import PagePartnerships from "./page/PagePartnerships.jsx";
import PageAbout from "./page/PageAbout.jsx";
import PageContact from "./page/PageContact.jsx";
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

						<Route path="/dashboard" render={(props) => <PageDashboard
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/private-sector" render={(props) => <PagePrivateSector
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/startups" render={(props) => <PageStartups
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/pc-doctors" render={(props) => <PagePcDoctors
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/public-sector" render={(props) => <PagePublicSector
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/initiatives" render={(props) => <PageInitiatives
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
						<Route path="/get-involved" render={(props) => <PageGetInvolved
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>

						<Route path="/education" render={(props) => <PageEducation
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/lifelong-learning" render={(props) => <PageLifelongLearning
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/jobs" render={(props) => <PageJobs
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/internships" render={(props) => <PageInternships
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>

						<Route path="/best-practice" render={(props) => <PageBestPractice
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/legal" render={(props) => <PageLegal
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/standards" render={(props) => <PageStandards
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/publications" render={(props) => <PagePublications
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/support-for-startups" render={(props) => <PageSupportForStartups
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/funding" render={(props) => <PageFunding
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/scholarships" render={(props) => <PageScholarships
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>
						<Route path="/partnerships" render={(props) => <PagePartnerships
							taxonomies={this.state.taxonomies}
							{...props}
						/>}/>

						<Route path="/about" render={() => <PageAbout/>}/>
						<Route path="/contact" render={() => <PageContact/>}/>

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
