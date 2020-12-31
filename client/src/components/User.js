import React, { Component } from 'react';
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";
import './styles/user.css';
import { socket } from '../sockApi';
import db from '../firebase'

class User extends Component {

	constructor() {
		super()
		this.state = {
			customerChatFromServer:"", 
			allChats:[] 
		}
	} 

	componentDidMount() { 
		//get exisitng chats for this agent - replace agent1 with the logged in agent
		db.collection('agent1').onSnapshot(snapshot => (
			this.setState({
				allChats: snapshot.docs.map(obj => {
					return {id:obj.id, data:obj.data()}
				})
			})
		))





		let currentUser = sessionStorage.getItem('aun')


		socket.emit('loggedInAgent', currentUser)

		//when a new message comes in
		socket.on('serverToAgent', data => {
			const { From, Body } = data
			let customerNumber = From.split('+')[1]
			//check if this customer exists in the db

		})

		socket.on('serverToSpecificAgent', data => {
			const { allChats } = this.state
			//to left bar chats area
			if (allChats.length === 0) {
				this.setState({
					allChats: [...allChats, data]
				})
			} else {
				const { From, Body } = data
				let customerIndex = allChats.findIndex(obj => obj.From === From)
				if (customerIndex === -1) {
					this.setState({
						allChats: [...allChats, data]
					})
				} else {
					let newArray = [...allChats]
					let customer = { ...newArray[customerIndex] }
					customer.Body = Body
					newArray[customerIndex] = customer
					this.setState({
						allChats: newArray
					})
				}
			}
			//to expanded chat area
			this.setState({
				customerChatFromServer: data
			})
		})
	}


	componentWillUnmount() {
		socket.disconnect()
	}

	handleAgentMessage = data => {
		socket.emit('agentToServer', data)
	}
	
	render() {
		const { customerChatFromServer, allChats } = this.state
		return (
			<div className="app__body">
			   	<LeftBar customerList={allChats}/>
				<ExpandedSingleChat customerMessage={customerChatFromServer} agentMessageToServer={this.handleAgentMessage}/>
		   	</div>
		  );
	}
}

export default User;
