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
		// socket.on('agentMessage', data => {
		// 	console.log(data)})
		// socket.emit('agentToCustomer', 'data')
		socket.on('connection', data => {
			console.log('react has connected')
		})
	}

	componentDidUpdate(prevState) {
		const { agentMessageFromChat } = this.state
		if (prevState.agentMessageFromChat !== agentMessageFromChat) {
			socket.emit('agentToCustomer', agentMessageFromChat)
		}
	}

	componentWillUnmount() {
		socket.disconnect()
	}

	handleAgentMessage = data => {
		this.setState({
			agentMessageFromChat : data
		})
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
