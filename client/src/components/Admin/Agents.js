import React, { Component } from "react";
import AddAgentModal from "./AddAgent";
import { AuthUserContext } from "../../session/index";
import AgentList from "./AgentList";
import "./styles/agents.css";

class Agents extends Component {

	constructor() {
		super()
		this.state = {
			show: false,
			companyid:"",
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

	sendCoyID = value => {
		this.setState({
			companyid: value
		})
	}
 
	render() {
		const { companyid } = this.state
		
		return(
			<div className="agents__container">
				<div className="agents__top__row">
					<div className="agents__top__heading">
						Team
					</div> 
					<div onClick={this.showModal} className="add__agent">
						<button>
							<div>Add Agent</div> 
						</button>   
					</div>
					<AddAgentModal companyid={companyid} show={this.state.show} closeModal={this.closeOpenModal}/> 
				</div>
				<div className="agents__bottom__area">
					<div className="agentlist__area">
						<AuthUserContext.Consumer>
							{ authUser => <AgentList companyID={this.sendCoyID} authUser={authUser}/> }
						</AuthUserContext.Consumer>
					</div>
				</div>
			</div>
		)
	} 
}

 
export default Agents;
