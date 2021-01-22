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

	constructor(props) {
		super(props)
		this.state = {
			allChats:[],
			companyid: null,
			selectedCustomer:{},
			agentID: this.props.authUser ? this.props.authUser.uid : this.props.authUser
		}
	} 
 

	getMessages = async () => {
		const { agentID } = this.state
		let allAgentsRef = db.collection('allagents');
		let companyid;
		if (agentID) {
			let snapshot = await allAgentsRef.where('agentId', '==', agentID).get()
			if (!snapshot.empty) {
				snapshot.forEach(doc => {
						companyid = doc.data().companyId
				})
				this.setState({
					companyid:companyid
				})
			}
		}
		if (companyid) {
			db.collection('companies').doc(companyid).collection('users').doc(agentID).collection('customers').onSnapshot(snapshot => {
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

	componentDidUpdate(prevProps) {
		if (prevProps.authUser !== this.props.authUser) {
			if (this.props.authUser) {
				this.setState({
					agentID: this.props.authUser.uid
				}, () => {
					this.getMessages()
				})
			}
		}
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
		const { allChats, selectedCustomer, companyid } = this.state
		return (
			<div className="app__body">
				<Switch>
					<Route path="/customers/all">
						<LeftBar getCustomerData={this.getCustomer} companyid={companyid} customerList={allChats}/>
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
