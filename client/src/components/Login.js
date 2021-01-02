import React, { Component } from "react";
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
		const { signinUsername } = this.state;
		//send to backend for auth and map the username to a socket if auth is successful

		//- change route to user if auth is true
		history.push('/customers') 

		//send the usernmae to the user socket
		sessionStorage.setItem('aun', signinUsername)

		//clear the form
		this.setState({
			signinUsername:"",
			signinPassword:""
		})
	}

	
 
	render() {
		const { signinUsername, signinPassword } = this.state
		return(
			<div className="signin-container">
				<div className="login_box">
					<div className="signin-text">
						<p>Sign in to Sauceflow</p> 
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
