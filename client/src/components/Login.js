import React, { Component } from "react";
// import axios from 'axios';
import history from "./History";
import "./styles/login.css"

class Login extends Component { 

	constructor(props) {
		super(props)
		this.state = {
			signinUsername:"",
			signinPassword:"" 
		} 
	} 

	getSigninUsername = e => {
		this.setState({
			signinUsername: e.target.value
		})
	}

	getSigninPassword = e => {
		this.setState({
			signinPassword: e.target.value
		})
	}

	onSubmitSignin =  async () => {
		const { signinUsername, signinPassword } = this.state;
		//send to backend for auth and map the username to a socket if auth is successful

		//- change route to user if auth is true
		history.push('/user') 

		//send the usernmae to the user socket
		this.props.agentLoginUsername(signinUsername)

		//clear the form
		this.setState({
			signinUsername:"",
			signinPassword:""
		})
	}

	// onSubmitSignin =  async () => {
	// 	const { signinUsername, signinPassword } = this.state;
	// 	let token = await addCSRFToken();
	// 	axios.defaults.headers['X-CSRF-Token'] = token;
	// 	if ((signinUsername === "") || (signinPassword === "")) {
	// 		alert("Please enter your username and password")
	// 	}
	// 	try {
	// 		let resp = await axios.post(`/api/v0/users/login`, this.state) 
	// 		if ((resp.status === 200) && (resp.data.auth === true)) {
	// 			this.setState({
	// 				signinUsername:"",
	// 				signinPassword:""
	// 			})
	// 			sessionStorage.setItem("userid", resp.data.userid)
	// 			sessionStorage.setItem("bookieSelection", resp.data.bookieAuth)
	// 			history.push('/user')
	// 		} 
	// 	} catch (error) {
	// 		alert("Wrong username or password")
	// 	}
		
	// }
 
	render() {
		const { signinUsername, signinPassword } = this.state
		return(
			<div className="signin-container">
				<div className="login_box">
					<div className="signin-text">
						<p>Sauceflow</p> 
					</div>
					<div className="signin-input">
						<input value={signinUsername} onChange={this.getSigninUsername} type="text" name="username" placeholder="username"/>
						<input value={signinPassword} onChange={this.getSigninPassword} type="password" name="password" placeholder="password"/>
					</div>
					<div className="login__area">
						<div className="login-button" onClick={this.onSubmitSignin}>Log in</div>
					</div>
					{
						// <div className="signin-footer">
						// 				<p onClick={() => history.push('/forgot')}>Forgot password?</p> 
						// 				<p onClick={() => history.push('/signup')}>Signup</p>
						// 			</div>
								}
				</div>
			</div>
		)
	}
	
}

export default Login;
