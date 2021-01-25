import React, { Component } from "react";
import { SessionDataContext } from "../encrypt/index";
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";

class FullUserArea extends Component {
	render() {
		const { allChats, agentID, selectedCustomer } = this.props
		return(
			<div className="app__body">
				<LeftBar customerList={allChats}/>
				<SessionDataContext.Consumer>
					{ secret => <ExpandedSingleChat secret={secret} agentUid={agentID} selectedCustomer={selectedCustomer}/> }
				</SessionDataContext.Consumer>
			</div>
		)
	}
}

export default FullUserArea;