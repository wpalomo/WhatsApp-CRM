import React, { Component } from 'react';
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";
import './styles/user.css';
import { socket } from '../sockApi';

class User extends Component {

	constructor() {
		super()
		this.state = {
			agentMessageFromChat:""
		}
	}

	componentDidMount() {
		socket.on('agentMessage', data => {
			console.log('incoming:', data)
		})
		socket.emit('agentToCustomer', 'from react to you on boxing day')
	}

	componentWillUnmount() {
		socket.disconnect()
	}

	handleAgentMessage = data => {
		console.log('agent message waiting to enter socket:', data)
	}
	
	render() {
		return (
		   	<div className="container">
		   		<LeftBar />
				<ExpandedSingleChat agentMessageToServer={this.handleAgentMessage}/>
		   	</div>
		  );
	}
}

export default User;
