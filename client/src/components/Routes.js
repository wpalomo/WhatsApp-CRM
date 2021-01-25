import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import history from "./History";
import HomePage from "./HomePage/HomePage";
import SignUpPage from "./Register/Register";
import PasswordResetPage from "./PasswordReset/index";
import PasswordForgetPage from "./PasswordForget/index";
import Admin from "./Admin/Admin"; 
import SignInPage from "./Login";
import AgentPage from "./User"; 
//import ProtectedRoute from "./ProtectedRoute";
 

const Routes = () => { 
	return(
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={HomePage}/>
				<Route path="/login" component={SignInPage}/>
				<Route path="/admin" component={Admin}/>
				<Route path="/register" component={SignUpPage}/>
				<Route path="/passwordReset" component={PasswordResetPage}/>
				<Route path="/passwordForget" component={PasswordForgetPage}/>
				<Route path="/customers" component={AgentPage}/>
			</Switch>
		</Router>  
	)  
}

export default Routes;
