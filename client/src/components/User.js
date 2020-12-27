import React, { Component } from 'react';
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";
import './styles/user.css';
import { socket } from '../sockApi';

class User extends Component {

	constructor() {
		super()
		this.state = {
			agentMessageFromChat:"",
			customerChatFromServer:""
		}
	}

	componentDidMount() {
		socket.on('serverToAgent', data => {
			this.setState({
				customerChatFromServer: data
			})
		})
	}

	componentDidUpdate(prevState) {
		const { agentMessageFromChat } = this.state
		if (prevState.agentMessageFromChat !== agentMessageFromChat) {
			socket.emit('agentToServer', agentMessageFromChat)
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
