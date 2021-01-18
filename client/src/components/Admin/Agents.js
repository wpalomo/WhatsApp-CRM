import React, { Component } from "react";
import AddAgentModal from "./AddAgent";
import AgentList from "./AgentList";
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

	closeOpenModal = () => {
		this.setState({
			show: !this.state.show
		})
	}

	getNewAgent = value => {
		console.log('na >>>', value)
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
					<AddAgentModal newAgent={this.getNewAgent} show={this.state.show} closeModal={this.closeOpenModal}/>
				</div>
				<div className="agents__bottom__area">
					<div className="agentlist__area">
						<AgentList />
					</div>
				</div>
			</div>
		)
	}
}

export default Agents;