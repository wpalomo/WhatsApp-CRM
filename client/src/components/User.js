import React, { Component } from 'react';
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";
import './styles/user.css';
import { socket } from '../sockApi';

class User extends Component {

	constructor() {
		super()
		this.state = {
			customerChatFromServer:""
		}
	}

	componentDidMount() {

		socket.on('connect', () => {
			const socketID = socket.id
			console.log(socketID)
		})

		socket.on('serverToAgent', data => {
			this.setState({
				customerChatFromServer: data
			})
		})

		socket.on('serverToSpecificAgent', data => {
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
		const { customerChatFromServer } = this.state
		return (
		   	<div className="container">
		   		<LeftBar />
				<ExpandedSingleChat customerMessage={customerChatFromServer} agentMessageToServer={this.handleAgentMessage}/>
		   	</div>
		  );
	}
}

export default User;
