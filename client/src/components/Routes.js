import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import history from "./History";

import Login from "./Login";
import User from "./User";

//old cose for passing username props - import Component if needed 
// class Routes extends Component {

// 	constructor() {
// 		super()
// 		this.state = {
// 			agentUsername:""
// 		}
// 	}

// 	getAgentUsername = data => {
// 		this.setState({
// 			agentUsername: data
// 		})
// 	}

// 	render() {
// 		const { agentUsername } = this.state
// 		return(
// 			<Router history={history}>
// 				<Switch>
// 					<Route 
// 						path="/login" 
// 						render={() => <Login agentLoginUsername={this.getAgentUsername}/>}
// 					/>
// 					<Route 
// 						path="/user" 
// 						render={() => <User agentUsername={agentUsername}/>}
// 					/>
// 				</Switch>
// 			</Router>
// 		)
// 	}
// }


const Routes = () => {
	return(
		<Router history={history}>
			<Switch>
				<Route path="/login" component={Login}/>
				<Route path="/user" component={User}/>
			</Switch>
		</Router>
	)
}

export default Routes;