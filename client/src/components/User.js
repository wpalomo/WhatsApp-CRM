import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";
import './styles/user.css';
//import { socket } from '../sockApi';
import db from '../firebase'

class User extends Component {

	constructor() {
		super()
		this.state = {
			customerChatFromServer:"", 
			allChats:[],
			selectedCustomer:{} 
		}
	} 

	getMessages = () => {
		this.unsubscribe = db.collection('agent1').onSnapshot(snapshot => (
			this.setState({
				allChats: snapshot.docs.map(obj => {
					return {id:obj.id, data:obj.data()}
				})
			})
		))
	}

	componentDidMount() { 
		// get exisitng chats for this agent - replace agent1 with the logged in agent
		this.getMessages()

		//let currentUser = sessionStorage.getItem('aun')


		//socket.emit('loggedInAgent', currentUser)

		//when a new message comes in
		// socket.on('serverToAgent', data => {
		// 	const { From, Body } = data
		// 	let customerNumber = Number(From.split('+')[1])
		// 	const agentRef = db.collection('agent1')
		// 	//check if this customer exists in the db for this agent
		// 	// agentRef
		// 	// 	.get()
		// 	// 	.then(snapshot => {
		// 	// 		const result = snapshot.docs.filter(obj => {
		// 	// 			return obj.data().customerNum === customerNumber
		// 	// 		})
		// 	// 		//data = [e], you need to work on the data[0]
		// 	// 		if (result.length !== 0) { //means this customer was already chatting with this agent
		// 	// 			//send the message to the frontend and db and this particular agent

		// 	// 		} else {
		// 	// 			//means this a new customer and should be sent to all connected agents
		// 	// 			//to all agents
		// 	// 			this.setState({
		// 	// 				allChats:[...allChats, data]
		// 	// 			})
		// 	// 			//to db of the agent

		// 	// 		}
		// 	// 	})
		// })

		// socket.on('serverToSpecificAgent', data => {
		// 	const { allChats } = this.state
		// 	//to left bar chats area
		// 	if (allChats.length === 0) {
		// 		this.setState({
		// 			allChats: [...allChats, data]
		// 		})
		// 	} else {
		// 		const { From, Body } = data
		// 		let customerIndex = allChats.findIndex(obj => obj.From === From)
		// 		if (customerIndex === -1) {
		// 			this.setState({
		// 				allChats: [...allChats, data]
		// 			})
		// 		} else {
		// 			let newArray = [...allChats]
		// 			let customer = { ...newArray[customerIndex] }
		// 			customer.Body = Body
		// 			newArray[customerIndex] = customer
		// 			this.setState({
		// 				allChats: newArray
		// 			})
		// 		}
		// 	}
		// 	//to expanded chat area
		// 	this.setState({
		// 		customerChatFromServer: data
		// 	})
		// })
	}


	componentWillUnmount() {
		//socket.disconnect()
		this.unsubscribe()
	}

	// handleAgentMessage = data => {
	// 	socket.emit('agentToServer', data)
	// }

	getCustomer = data => {
		this.setState({
			selectedCustomer: data
		})
	}
	
	render() {
		const { customerChatFromServer, allChats, selectedCustomer } = this.state
		return (
			<div className="app__body">
				<Switch>
					<Route path="/customers/all">
						<LeftBar getCustomerData={this.getCustomer} customerList={allChats}/>
					</Route>
					<Route path="/customers/:customerId">
						<LeftBar getCustomerData={this.getCustomer} customerList={allChats}/>
						<ExpandedSingleChat selectedCustomer={selectedCustomer} customerMessage={customerChatFromServer} agentMessageToServer={this.handleAgentMessage}/>
					</Route>
					<Redirect from="/customers" to="/customers/all" exact/>
				</Switch>
		   	</div>
		  );
	}
}

export default User;
 