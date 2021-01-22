import React from 'react';
// import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Router, Switch, Route } from "react-router-dom";
import history from "./History";

import HomePage from "./HomePage/HomePage";
import SignUpPage from "./Register/Register";
import PassworResetPage from "./PasswordReset/index";
import Admin from "./Admin/Admin"; 
import SignInPage from "./Login";
import User from "./User"; 
import ProtectedRoute from "./ProtectedRoute";

//OLD DATA BELOW >> SCROLL DOWN
const Routes = () => { 
	return(
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={HomePage}/>
				<Route path="/login" component={SignInPage}/>
				<Route path="/admin" component={Admin}/>
				<Route path="/register" component={SignUpPage}/>
				<Route path="/passwordReset" component={PassworResetPage}/>
				<ProtectedRoute path="/customers" component={User}/>
			</Switch>
		</Router>  
	)  
}

export default Routes;

// const Routes = () => {
// 	return(
// 		<Router history={history}>
// 			<Switch>
// 				{
// 					//<Route exact path="/" render={() => (<Redirect to={{ pathname: '/login' }}/>)}/>
// 			}
// 				<Route exact path="/" component={HomePage}/>
// 				<Route path="/admin" component={Admin}/>
// 				<Route path="/login" component={Login}/>
// 				<Route path="/register" component={SignUpPage}/>
// 				<ProtectedRoute path="/customers" component={User}/>
// 			</Switch>
// 		</Router>  
// 	)  
// }

// const Routes = ({ authUser }) => {
// 	return(
// 		<Router history={history}>
// 			<Switch>
// 				<Route exact path="/" component={HomePage}/>
// 				<Route 
// 					path="/login" 
// 					render={(props) => (
// 						<SignInPage {...props} isAuth={authUser}/>
// 					)} 
// 				/>
// 				<Route path="/admin" component={Admin}/>
// 				<Route path="/register" component={SignUpPage}/>
// 				<ProtectedRoute path="/customers" component={User}/>
// 			</Switch>
// 		</Router>  
// 	)  
// }