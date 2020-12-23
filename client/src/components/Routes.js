import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import history from "./History";

import Login from "./Login";
import User from "./User";
 
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