import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
//import { withFirebase } from "../firebase/index";
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from "../session/index";
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";
import './styles/user.css';

import { db } from '../firebase'

const AgentPage = () => (
	<div>
		<AuthUserContext.Consumer>
			{  authUser => <CustomerList authUser={authUser}/> }
		</AuthUserContext.Consumer>
	</div>
)

class UserBase extends Component {

	constructor() {
		super()
		this.state = {
			allChats:[],
			selectedCustomer:{} 
		}
	} 
 
	// getMessages = () => {
	// 	let agentID = sessionStorage.getItem('aid')
	// 	this.unsubscribe = db.collection('agents').doc(agentID).collection('customers').onSnapshot(snapshot => (
	// 		this.setState({
	// 			allChats: snapshot.docs.map(obj => {
	// 				return {id:obj.id, data:obj.data()}
	// 			})
	// 		})
	// 	))
	// } 

	getMessages = async () => {
		const { authUser } = this.props
		let allAgentsRef = db.collection('allagents');
		let currentUser;
		authUser ? currentUser = authUser.uid : currentUser = authUser
		let companyid;
		if (currentUser) {
			let snapshot = await allAgentsRef.where('agentId', '==', currentUser).get()
			if (!snapshot.empty) {
				snapshot.forEach(doc => {
						companyid = doc.data().companyId
					})
				}
		}
		if (companyid) {
			let allCustomers = await db.collection('companies').doc(companyid).collection('users').doc(currentUser).collection('customers').onSnapshot(snapshot => {
				this.setState({
					allChats: snapshot.docs.map(obj => {
						return {id:obj.id, data:obj.data()}
					})
				})
			})
		}
		
	}  
 
	componentDidMount() { 
		this.getMessages()
	} 


	// componentWillUnmount() {
	// 	this.unsubscribe()
	// }

	getCustomer = data => {
		this.setState({
			selectedCustomer: data
		})
	}
	
	render() {
		const { allChats, selectedCustomer } = this.state
		const { authUser } = this.props
		authUser ? console.log('logged in >>', authUser.uid) : console.log('nobody logged in')
		return (
			<div className="app__body">
				<Switch>
					<Route path="/customers/all">
						{
							//<LeftBar getCustomerData={this.getCustomer} customerList={allChats}/>
						}
						<LeftBar />
					</Route>
					<Route path="/customers/:customerId">
						<LeftBar getCustomerData={this.getCustomer} customerList={allChats}/>
						<ExpandedSingleChat selectedCustomer={selectedCustomer} agentMessageToServer={this.handleAgentMessage}/>
					</Route>
					<Redirect from="/customers" to="/customers/all" exact/>
				</Switch>
		   	</div>
		  );  
	} 
}

const CustomerList = withRouter(UserBase)

export default AgentPage;

export { CustomerList };
