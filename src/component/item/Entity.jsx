import React, { Component } from "react";
import "./Entity.css";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class Entity extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return <div className="Entity card">
			<div className="card-horizontal">
				<div className="img-square-wrapper">
					{this.props.info.image !== null && this.props.info.image !== undefined
						? <img
							className="card-img-top"
							src={getApiURL() + "public/get_public_image/" + this.props.info.image}
							alt="Card image cap"/>

						: <NoImage/>
					}
				</div>
				<div className="card-body">
					<h5 className="name">{this.props.info.name}</h5>
				</div>
			</div>

			<div className="buttons">
				<a
					href={"/entity/" + this.props.info.id}
					className="Entity-link">
					<button className="small link">
						See entity profile &nbsp;<i className="fas fa-arrow-right"/>
					</button>
				</a>
			</div>
		</div>;
	}
}
