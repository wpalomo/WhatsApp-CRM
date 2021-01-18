import React, { Component } from "react";
import "./styles/agents.css";

class Chats extends Component {

	constructor() {
		super() 
		this.state = {
			agentList: [{name:'Jomi Oni', activeAgent: false}, {name:'Winifred Robb', activeAgent: false}, {name:'Funke Sausage', activeAgent: false}]
		}
	}

	setActiveAgent = e => {
		const { agentList } = this.state
		let currentClicked = e.target.id
		let singleActive = agentList.map(obj => {
			if (obj.name === currentClicked) {
				return { ...obj, activeAgent: !obj.activeAgent}
			}
			return obj
		})
		this.setState({
			agentList: singleActive
		}, () => {
			const { agentList } = this.state 
			let newList = agentList.map(obj => {
				if (obj.name !== currentClicked) {
					return { ...obj, activeAgent: false}
				}
				return obj
			})
			this.setState({
				agentList: newList
			})		
		})
	}

	

	render() {
		const { agentList } = this.state
		return(
			<div className="agents__container">
					<div className="agents__top__row">
						<div className="agents__top__heading">
							All Chats
						</div>
					</div>
					<div className="agents__bottom__area">
						<div className="agentlist__area chat__area">
							<div className="agents__area">
								<div className="agents__area__heading">
									<p>Agents</p>
								</div>
								<div className="agents__area__body">
									{
										agentList.map((obj, idx) => (
											<p onClick={this.setActiveAgent} key = {idx} id={obj.name} className={obj.activeAgent ? "active__agent" : ""}>{ obj.name }</p>
										))
									}
								</div>
							</div>
							<div className="agent__customers">
								<div className="agent__customers__heading">
									<p>Customer</p>
								</div>
								<div className="agent__customers__body">
									<p>+2347030117552</p>
									<p>+2348152258413</p>
									<p>+2348060338847</p>
									<p>+2348060338847</p>
								</div>
							</div>
							<div className="agent__chat">
								<div className="agent__chat__heading">
									<p>Chat History</p>
								</div>
								<div className="agent__chat__body">
									
								</div>
							</div>
						</div>
					</div>
				</div>
		)
	}
}

export default Chats;