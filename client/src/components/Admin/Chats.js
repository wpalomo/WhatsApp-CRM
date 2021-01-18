import React, { Component } from "react";
import { team, customers } from "./team";
import "./styles/agents.css";

class Chats extends Component {

	constructor() {
		super() 
		this.state = {
			agentList: [],
			customerList: []
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
			agentList: singleActive,
			customerList: customers
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

	setActiveNum = e => {
		const { customerList } = this.state
		let currentClicked = e.target.id
		let singleActive = customerList.map(obj => {
			if (obj.num === currentClicked) {
				return { ...obj, activeNum: !obj.activeNum}
			}
			return obj
		})
		this.setState({
			customerList: singleActive,
		}, () => {
			const { customerList } = this.state 
			let newCusList = customerList.map(obj => {
				if (obj.num !== currentClicked) {
					return { ...obj, activeNum: false}
				}
				return obj
			})
			this.setState({
				customerList: newCusList
			})		
		})
	}

	componentDidMount() {
		let agents = team.filter(obj => (obj.role === 'Agent' && obj.status === 'active'))
		this.setState({
			agentList: agents
		})
	}

	

	render() {
		const { agentList, customerList } = this.state
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
									{
										customerList.map((obj, idx) => (
											<p onClick={this.setActiveNum} key={idx} id={obj.num} className={obj.activeNum ? "active__num" : ""}>{ obj.num }</p>
										))
									}
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