import React from "react";
import "./Menu.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPrivateAppURL } from "../../utils/env.jsx";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showFlyingMenu: false,
		};
	}

	componentDidMount() {
		document.querySelector("#root").addEventListener("scroll", () => {
			const currentScrollPos = document.getElementById("root").scrollTop;

			if (currentScrollPos !== undefined && currentScrollPos !== 0) {
				if (currentScrollPos > 300 && !this.state.showFlyingMenu) {
					this.setState({ showFlyingMenu: true });
				} else if (currentScrollPos < 300) {
					this.setState({ showFlyingMenu: false });
				}
			}
		});
	}

	// eslint-disable-next-line class-methods-use-this
	getNavBar() {
		return <Nav className="mr-sm-2 ml-auto main-navbar-nav">
			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">The Ecosystem</div>
						<i className="fas fa-chevron-down"/>
					</div>
				}
				id="basic-nav-dropdown"
			>
				<div className="row">
					<div className="col-md-6">
						<div className="h8">
							Get an overview
						</div>
						<NavDropdown.Item>
							<Link to="/dashboard">
								<div className="Menu-title">Dashboard</div>
							</Link>
						</NavDropdown.Item>
					</div>
					<div className="col-md-6">
						<div className="h8">
							Member list
						</div>
						<NavDropdown.Item>
							<Link to="/ecosystem?tab=private-sector">
								<div className="Menu-title">Private Sector</div>
							</Link>
						</NavDropdown.Item>
						<div className="sub-box">
							<NavDropdown.Item>
								<Link to="/ecosystem?tab=private-sector&startup_only=true">
									<div className="Menu-title">Startups</div>
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link to="/ecosystem?tab=private-sector&pcdoctor_only=true">
									<div className="Menu-title">PC Doctors</div>
								</Link>
							</NavDropdown.Item>
						</div>
						<NavDropdown.Item>
							<Link to="/ecosystem?tab=public-sector">
								<div className="Menu-title">Public Sector</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/ecosystem?tab=initiatives">
								<div className="Menu-title">Clubs, Associations & Initiatives</div>
							</Link>
						</NavDropdown.Item>
					</div>
				</div>
			</NavDropdown>

			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">News & Events</div>
						<i className="fas fa-chevron-down"/>
					</div>
				}
				id="basic-nav-dropdown">
				<div className="row">
					<div className="col-md-6">
						<div className="h8">
							News
						</div>
						<NavDropdown.Item>
							<Link to="/news">
								<div className="Menu-title">Latest News</div>
							</Link>
						</NavDropdown.Item>
						<a
							className="dropdown-item"
							href="https://newsletter.cybersecurity-luxembourg.com"
							target="_blank"
							rel="noreferrer">
							<div className="Menu-title">Our Newsletter</div>
						</a>
					</div>
					<div className="col-md-6">
						<div className="h8">
							Events
						</div>
						<NavDropdown.Item>
							<Link to="/events">
								<div className="Menu-title">Upcoming Events</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/events?tab=past">
								<div className="Menu-title">Past Events</div>
							</Link>
						</NavDropdown.Item>
					</div>
				</div>
			</NavDropdown>

			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">Skills & Jobs</div>
						<i className="fas fa-chevron-down"/>
					</div>
				}
				id="basic-nav-dropdown"
			>
				<div className="row">
					<div className="col-md-6">
						<div className="h8">
							Skills
						</div>
						<NavDropdown.Item>
							<Link to="/education">
								<div className="Menu-title">Education</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/education?tab=trainings">
								<div className="Menu-title">Lifelong Learning</div>
							</Link>
						</NavDropdown.Item>
					</div>
					<div className="col-md-6">
						<div className="h8">
							Jobs
						</div>
						<NavDropdown.Item>
							<Link to="/jobs">
								<div className="Menu-title">Jobs</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/jobs?tab=internship">
								<div className="Menu-title">Internships</div>
							</Link>
						</NavDropdown.Item>
					</div>
				</div>
			</NavDropdown>

			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">Resources & Support</div>
						<i className="fas fa-chevron-down"/>
					</div>
				}
				id="basic-nav-dropdown">
				<div className="row">
					<div className="col-md-6">
						<div className="h8">
							Resources
						</div>
						<NavDropdown.Item>
							<Link to="/best-practice">
								<div className="Menu-title">Tips & Best practices</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/legal">
								<div className="Menu-title">Norms, Rules & Laws</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/standards">
								<div className="Menu-title">Standards</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/publications">
								<div className="Menu-title">Publications Library</div>
							</Link>
						</NavDropdown.Item>
					</div>
					<div className="col-md-6">
						<div className="h8">
							Support
						</div>
						<NavDropdown.Item>
							<Link to="/support-for-startups">
								<div className="Menu-title">Support for Startups</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/funding">
								<div className="Menu-title">Funding Opportunities</div>
							</Link>
						</NavDropdown.Item>
						{/* <NavDropdown.Item>
							<Link to="/scholarships">
								<div className="Menu-title">Scholarships</div>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to="/partnerships">
								<div className="Menu-title">Partnerships & Collaboration</div>
							</Link>
						</NavDropdown.Item> */}
					</div>
				</div>
			</NavDropdown>

			<Nav.Link className="nav-item">
				<Link to="/about">
					<div className="Menu-title">About us</div>
				</Link>
			</Nav.Link>

			<Nav.Link className="nav-item">
				<Link to="/contact">
					<div className="Menu-title">Contact</div>
				</Link>
			</Nav.Link>
		</Nav>;
	}

	render() {
		return (
			<div className={"Menu max-sized-section"}>
				<Navbar expand="lg">
					<Navbar.Brand>
						<Link to="/">
							<img
								className={"logo"}
								src="/img/logo-cyberlux-full.png"
								alt="CYBERLUX Logo"
							/>
						</Link>
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav"/>

					<Navbar.Collapse>
						{this.getNavBar()}
					</Navbar.Collapse>

					<div className="split-bar"/>

					<Navbar.Collapse id="basic-navbar-nav" className="vertically-centered">
						<Nav className="top-right-bar mr-sm-2 ml-auto">
							<Nav.Link className="top-link">
								<Link to="/search">
									<div className="Menu-title"><i className="fas fa-search"/>Search</div>
								</Link>
							</Nav.Link>
							<Nav.Link className="top-link">
								<Link to="/dashboard">
									<div className="Menu-title"><i className="fas fa-th"/>Dashboard</div>
								</Link>
							</Nav.Link>
							<a className="nav-link top-link">
								<a
									href={getPrivateAppURL()}
									target="_blank"
									rel="noreferrer">
									<div className="Menu-title"><i className="fas fa-user"/>Log in/Register</div>
								</a>
							</a>

							<div className="separator"/>
							<div className="split-bar"/>

							<button
								className="red small"
								href={getPrivateAppURL()}
								onClick={() => this.props.history.push("support")}
							>
								IMMEDIATE SUPPORT
							</button>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
