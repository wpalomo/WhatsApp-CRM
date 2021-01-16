import React, { Component } from "react";
import Billhead from "./Payment/Billhead";
import "./styles/subscription.css";


class Subscription extends Component {

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
			<div className="subscr__container">
				<Billhead />
				<div className="billing__footer">
					<p onClick={this.changeClass} className={selectorClass ? "active__tab" : ""}>Your Subscription</p>
					<p onClick={this.changeClass} className={selectorClass ? "" : "active__tab"}>Account details</p>
				</div>
				<div className="expanded__topright">
					<p>Your Subscription</p>
				</div>
				<div className="expanded__downright">
					<p>RightDown</p>
				</div>
			</div>
		)
	}
}

export default Subscription;