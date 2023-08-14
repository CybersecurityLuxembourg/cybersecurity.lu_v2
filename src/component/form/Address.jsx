import React, { Component } from "react";
import "./Address.css";

export default class Address extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		if (!this.props.info) {
			return "";
		}

		return <div className="Address">
			<div className="marker">
				<i className="fas fa-map-marker-alt"/>
			</div>

			<div className="details">
				{this.props.info?.number && this.props.info?.address_1
					&& <div>{this.props.info.number} {this.props.info.address_1}</div>
				}

				{this.props.info?.address_2
					&& <div>{this.props.info.address_2}</div>
				}

				{this.props.info?.postal_code && this.props.info?.city
					&& <div>{this.props.info.city}</div>
				}

				{this.props.info?.country
					&& <div>{this.props.info.country}</div>
				}
			</div>
		</div>;
	}
}
