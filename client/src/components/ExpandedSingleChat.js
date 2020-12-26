import React, { Component } from 'react';

class ExpandedSingleChat extends Component {

	constructor() {
		super()
		this.state = {
			agentMessage:""
		}
	}

	getAgentMessage = e => {
		this.setState({
			agentMessage: e.target.value
		})
	}

	submitAgentMessage = () => {
		//show on the screen, in the left bar, and pass to the server
		//to server
		this.props.agentMessageToServer(this.state.agentMessage)
	}

	render() {
		const { agentMessage } = this.state
		return(
			<div className="singlechat">
				<ul id="messages"></ul>
				 <div className="single_message">
			      <div className="input_area">
			        <input value={agentMessage} id="m" autoComplete="off" onChange={this.getAgentMessage}/>
			      </div>
			      <div>
			      	<button onClick={this.submitAgentMessage}>Send</button>
			      </div>
			    </div>
			</div>
		)
	}
}

export default ExpandedSingleChat;