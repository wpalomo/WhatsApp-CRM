import React, { Component } from 'react';
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";
import './styles/user.css';
import { socket } from '../sockApi';

class User extends Component {

	componentDidMount() {
		socket.on('agentMessage', data => {
			console.log('incoming:', data)
		})
		socket.emit('agentToCustomer', 'from react to you on xmas')
	}

	componentWillUnmount() {
		socket.disconnect()
	}
	
	render() {
		return (
		   	<div className="container">
		   		<LeftBar />
				<ExpandedSingleChat />
		   	</div>
		  );
	}
}

export default User;
