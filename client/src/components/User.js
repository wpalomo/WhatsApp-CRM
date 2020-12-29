import React, { Component } from 'react';
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";
import './styles/user.css';
import { socket } from '../sockApi';

class User extends Component {

	constructor() {
		super()
		this.state = {
			customerChatFromServer:"",
			allChats:[]
		}
	}

	componentDidMount() { 
		const { agentUsername } = this.props
		
		socket.on('connect', () => {
			const socketID = socket.id
			console.log(socketID)
		})

		socket.emit('loggedInAgent', agentUsername)

		socket.on('serverToAgent', data => {
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
		   	<div className="container">
		   		<LeftBar customerList={allChats}/>
				<ExpandedSingleChat customerMessage={customerChatFromServer} agentMessageToServer={this.handleAgentMessage}/>
		   	</div>
		  );
	}
}

export default User;
