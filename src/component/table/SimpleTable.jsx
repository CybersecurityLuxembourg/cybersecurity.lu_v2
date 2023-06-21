import React, { Component } from "react";
import "./SimpleTable.css";

class SimpleTable extends Component {
	constructor(props) {
		super(props);

		this.setPreviousPage = this.setPreviousPage.bind(this);
		this.setNextPage = this.setNextPage.bind(this);

		this.state = {
			id: "SimpleTable-" + Date.now(),
			page: 1,
			numberDisplayed: props.numberDisplayed !== undefined ? props.numberDisplayed : 9,
		};
	}

	setPreviousPage() {
		if (this.state.page > 1) {
			this.setState({ page: this.state.page - 1 });
		}
	}

	setNextPage() {
		if (Math.min(
			this.state.page * this.state.numberDisplayed,
			this.props.items.length,
		) < this.props.items.length) {
			this.setState({ page: this.state.page + 1 });
		}
	}

	render() {
		const minDisplayed = Math.min(
			this.state.page * this.state.numberDisplayed - (this.state.numberDisplayed - 1),
			this.props.items.length,
		);
		const maxDisplayed = Math.min(
			this.state.page * this.state.numberDisplayed,
			this.props.items.length,
		);

		return (
			<div id={this.state.id} className={"SimpleTable row row-spaced "
			+ (this.props.className ? this.props.className : "")}>

				{this.props.items.slice().splice(minDisplayed - 1, this.state.numberDisplayed)
					.map((o) => this.props.buildElement(...o))
				}

				{this.props.hidePagination !== true
					&& <div className={"col-md-12"}>
						<div className="SimpleTable-pagination">
							<div className={"SimpleTable-arrowLeft"}>
								<i className={"fas fa-angle-left hoverEffect elementIcon "
									+ (minDisplayed <= 1 ? "iconDisabled" : "")}
								onClick={this.setPreviousPage}/>
							</div>

							<div className="SimpleTable-info">
								{minDisplayed}-{maxDisplayed} on {this.props.items.length}
							</div>

							<div className={"SimpleTable-arrowRight"}>
								<i className={"fas fa-angle-right hoverEffect elementIcon "
									+ (maxDisplayed === this.props.items.length
										? "iconDisabled" : "")}
								onClick={this.setNextPage}/>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default SimpleTable;
