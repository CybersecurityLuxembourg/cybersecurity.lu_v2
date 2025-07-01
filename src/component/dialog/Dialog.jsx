import React from "react";
import "./Dialog.css";
import Popup from "reactjs-popup";

export default class Dialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Popup
				trigger={<div className="trigger">
					{this.props.trigger}
				</div>}
				modal
				closeOnDocumentClick
				className={"Dialog"}
			>
				{(close) => (
					<>
						<div className={"wrapper"}>
							 {this.props.content}
						</div>
						<div
							className="close-button"
							data-hover="Close"
							onClick={close}>
							<i className="fas fa-times"/>
						</div>
					</>
				)}
			</Popup>
		);
	}
}
