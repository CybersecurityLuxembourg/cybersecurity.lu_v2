import React from "react";
import "./Field.css";
import Select from "react-select";
import _ from "lodash";
import Chip from "./Chip.jsx";

function getSelectStyle() {
	return {
		input: () => ({
			height: "32px !important",
		}),
		control: (base, state) => ({
			...base,
			border: state.isFocused ? "2px solid #000 !important" : "2px solid lightgrey !important",
			boxShadow: 0,
		}),
		singleValue: (base) => ({
			...base,
			color: "inherit !important",
		}),
	};
}

export default class Field extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.getFormatClassName = this.getFormatClassName.bind(this);
		this.addValue = this.addValue.bind(this);
		this.deleteValue = this.deleteValue.bind(this);
		this.getField = this.getField.bind(this);

		this.state = {
			value: props.value,
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			this.setState({ value: this.props.value });
		}
	}

	onClick() {
		const newState = !this.props.value;
		if (typeof this.props.onClick !== "undefined" && this.props.disabled !== true) this.props.onClick(newState);
	}

	onChange(value) {
		this.setState({ value });

		if (typeof this.props.onChange !== "undefined") this.props.onChange(value);
	}

	onBlur(value) {
		if (typeof this.props.onBlur !== "undefined") this.props.onBlur(value);
	}

	addValue(valueToAdd) {
		if (this.state.value.indexOf(valueToAdd) < 0) {
			const value = _.cloneDeep(this.state.value);
			value.push(valueToAdd);
			this.setState({ value });
			this.props.onChange(value);
		}
	}

	deleteValue(valueToDelete) {
		let value = _.cloneDeep(this.state.value);
		value = value.filter((v) => v !== valueToDelete);
		this.setState({ value });
		this.props.onChange(value);
	}

	getFormatClassName() {
		if (this.props.format === undefined) {
			return "";
		}
		if (this.props.format(this.state.value)) return "right-format";
		return "wrong-format";
	}

	getField() {
		switch (this.props.type) {
		case "textarea":
			return <textarea
				value={this.state.value}
				placeholder={this.props.placeholder}
				onChange={(v) => this.onChange(v.target.value)}
				onBlur={(v) => this.onBlur(v.target.value)}
				disabled={this.props.disabled}
				autoFocus={this.props.autofocus}
				onKeyDown={this.props.onKeyDown}
			/>;
		case "select":
			return <select
				value={{
					label: this.props.options
						.filter((o) => o.value === this.state.value).length > 0
						? this.props.options.filter((o) => o.value === this.state.value)[0].label
						: this.state.value,
					value: this.state.value,
				}}
				styles={getSelectStyle()}
				options={this.props.options}
				placeholder={this.props.placeholder}
				onChange={(v) => this.onChange(v.value)}
			/>;
		case "checkbox":
			return <div>
				<input
					className={this.getFormatClassName()}
					type={typeof this.props.type !== "undefined" ? this.props.type : "text"}
					value={this.state.value}
					placeholder={this.props.placeholder}
					onChange={(v) => this.onChange(v.target.value)}
					onBlur={(v) => this.onBlur(v.target.value)}
					disabled={this.props.disabled}
					autoFocus={this.props.autofocus}
					onKeyDown={this.props.onKeyDown}
				/> {this.props.checkBoxLabel}
			</div>;
		case "multiselect":
			return <div>
				<Select
					value={null}
					styles={getSelectStyle()}
					options={this.props.options}
					onChange={(v) => this.addValue(v.value)}
				/>
				<div className="chips">
					{(Array.isArray(this.state.value) ? this.state.value : []).map((o) => (
						<Chip
							key={o}
							label={this.props.options.filter((op) => op.value === o)[0].label}
							value={o}
							onClick={(v) => this.deleteValue(v)}
						/>
					))}
				</div>
			</div>;
		default:
			return <input
				className={this.getFormatClassName()}
				type={typeof this.props.type !== "undefined" ? this.props.type : "text"}
				value={this.state.value}
				placeholder={this.props.placeholder}
				onChange={(v) => this.onChange(v.target.value)}
				onBlur={(v) => this.onBlur(v.target.value)}
				disabled={this.props.disabled}
				autoFocus={this.props.autofocus}
				onKeyDown={this.props.onKeyDown}
			/>;
		}
	}

	render() {
		let labelWidth = null;
		let fieldWidth = null;

		if (this.props.fullWidth) {
			labelWidth = "col-md-12";
			fieldWidth = "col-md-12";
		} else {
			labelWidth = "col-md-" + (this.props.labelWidth ? this.props.labelWidth : 6);
			fieldWidth = "col-md-" + (this.props.labelWidth ? 12 - this.props.labelWidth : 6);
		}

		return (
			<div className={"Field"}>
				<div className={"row"}>
					<div className={labelWidth}>
						<div className={"label"}>
							{this.props.label}
						</div>
					</div>
					<div className={fieldWidth}>
						{this.getField()}
					</div>
				</div>
			</div>
		);
	}
}
