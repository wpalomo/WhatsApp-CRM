import React, { Component } from "react";
import AddAgentModal from "./AddAgent";
import "./styles/agents.css";

class Agents extends Component {

	constructor() {
		super()
		this.state = {
			show: false
		}
	}

	
	showModal = () => {
		this.setState({
			show: true
		})
	}

	closeOpenModal = e => {
		this.setState({
			show: !this.state.show
		})
	}

	render() {
		return(
			<div className="agents__container">
				<div className="agents__top__row">
					<div className="agents__top__heading">
						Team
					</div>
					<div onClick={this.showModal} className="add__agent">
						<button>
							<div>+ Add</div>
						</button>
					</div>
					<AddAgentModal show={this.state.show} closeModal={this.closeOpenModal}/>
				</div>
				<div className="agents__bottom__area">
					Coming Soon!
				</div>
			</div>
		)
	}
}

export default Agents;