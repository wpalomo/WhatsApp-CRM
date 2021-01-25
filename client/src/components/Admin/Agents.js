import React, { Component } from "react";
import AddAgentModal from "./AddAgent";
//import { AuthUserContext, withAuthorization } from "../../session/index";
import { AuthUserContext } from "../../session/index";
import AgentList from "./AgentList";
import "./styles/agents.css";

class Agents extends Component {

	constructor() {
		super()
		this.state = {
			show: false,
			companyid:""
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
							<div>+ Add</div>
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

//const condition = authUser => authUser != null 
//condition is a function (which was predefined as an argument in 
//private/withAuthorization.js) and it checks if the authUser is not null
//if it is null, it will redirect to the login page
 
export default Agents;
//export default withAuthorization(condition)(Agents);