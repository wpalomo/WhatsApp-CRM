import React, { Component } from "react";
import { customers, chats } from "./team";
import "./styles/agents.css";
import { db } from "../../firebase";

class Chats extends Component {

	constructor(props) {
		super(props) 
		this.state = {
			agentList: [], 
			customerList: [],
			chatHistory:[],
			adminUser: this.props.authUser ? this.props.authUser.uid : this.props.authUser
		}
	}

	setActiveAgent = e => {
		const { agentList } = this.state
		let currentClicked = e.target.id
		let singleActive = agentList.map(obj => {
			if (obj.name === currentClicked) {
				return { ...obj, activeAgent: !obj.activeAgent}
			} else {
				return obj
			}
		})
		this.setState({
			agentList: singleActive
		}, () => {
			let newList = this.state.agentList.map(obj => {
				if (obj.name !== currentClicked) {
					return { ...obj, activeAgent: false }
				} else {
					return obj
				}
			})
			this.setState({
				agentList: newList
			}, () => {
				let selectedAgent = this.state.agentList.filter(obj => obj.activeAgent === true)
				if (selectedAgent.length === 1) {
					this.setState({
						customerList: customers
					}, () => {
						let selectedCustomer = this.state.customerList.filter(obj => obj.activeNum === true)
						if (selectedCustomer.length === 0) {
							this.setState({
								chatHistory:[]
							})
						}
					})
				} else {
					this.setState({
						customerList: [],
						chatHistory:[]
					})
				}
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
			customerList: singleActive
		}, () => {
			let newCusList = this.state.customerList.map(obj => {
				if (obj.num !== currentClicked) {
					return { ...obj, activeNum: false}
				}
				return obj
			})
			this.setState({
				customerList: newCusList
			}, () => {
				let selectedCustomer = this.state.customerList.filter(obj => obj.activeNum === true)
				if (selectedCustomer.length === 1) {
					this.setState({
						chatHistory: chats
					})
				} else {
					this.setState({
						chatHistory: []
					})
				}
			})		
		})
	}

	getUsers = async () => {
		let companyRef = db.collection('companies');
		let adminRef = db.collection('admins');
		const { adminUser } = this.state
		let adminID = adminUser
		if (adminID) {
			let snapshot = await adminRef.where('adminId', '==', adminID).get()
			let companyName; 
			if (!snapshot.empty) {
				snapshot.forEach(doc => { 
					companyName = doc.data().company
				})
			}
			let companyId; 
			if (companyName) {
				let companySnapshot = await companyRef.where('name', '==', companyName).get()
				if (!companySnapshot.empty) {
					companySnapshot.forEach(doc => {
						companyId = doc.id
					})
				}
			}
			
			this.unsubscribe = companyRef.doc(companyId).collection('users').where('role', '==', 'Agent').onSnapshot(snapshot => (
			this.setState({
					agentList: snapshot.docs.map(obj => {
						return obj.data()
					})
				})
			))
		}
	} 

	componentDidMount() {
		this.getUsers()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.authUser !== this.props.authUser) {
			if (this.props.authUser) {
				this.setState({
					adminUser: this.props.authUser.uid
				}, () => {
					this.getUsers()
				})
			}
		}
	}

	

	render() {
		const { agentList, customerList, chatHistory } = this.state
		
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
									{
										chatHistory.map((obj, idx) => (
											<p key={idx} className={`chat__message ${obj.user === 'agent' && "chat__receiver"}`}>
												{ obj.message }
												<span className="chat__timestamp">{ obj.user }</span>
											</p>
										))
									}
								</div> 
							</div>
						</div>
					</div>
				</div>
		)
	}
}

export default Chats;