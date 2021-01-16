import React, { Component } from "react";

class Billfoot extends Component {

	constructor() {
		super()
		this.state = {
			selectorClass: true
		}
	}

	changeClass = () => {
		this.setState({
			selectorClass: !this.state.selectorClass
		})
	}

	render() {
		const { selectorClass } = this.state
		return(
			<div className="billing__footer">
				<p onClick={this.changeClass} className={selectorClass ? "active__tab" : ""}>Your Subscription</p>
				<p onClick={this.changeClass} className={selectorClass ? "" : "active__tab"}>Account details</p>
			</div>
		)
	}
}

export default Billfoot;