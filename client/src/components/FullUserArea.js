// import React, { Component } from "react";
// import { withAuthorization } from "../session/index";
// import { SessionDataContext } from "../encrypt/index";
// import LeftBar from "./LeftSideBar/LeftBar";
// import ExpandedSingleChat from "./ExpandedSingleChat";

// class FullUserArea extends Component {
// 	render() {
// 		const { allChats, agentID, selectedCustomer } = this.props
// 		return(
// 			<div className="app__body">
// 				<LeftBar customerList={allChats}/>
// 				<SessionDataContext.Consumer>
// 					{ secret => <ExpandedSingleChat secret={secret} agentUid={agentID} selectedCustomer={selectedCustomer}/> }
// 				</SessionDataContext.Consumer>
// 			</div> 
// 		)
// 	}
// } 

// const condition = authUser => authUser != null 
// //condition is a function (which was predefined as an argument in 
// //private/withAuthorization.js) and it checks if the authUser is not null
// //if it is null, it will redirect to the login page

// export default withAuthorization(condition)(FullUserArea);