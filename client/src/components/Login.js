import React, { Component } from "react";
import history from "./History";
import "./styles/login.css"
import whatsapp from './media/whatsapp.png';

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

	onSubmitSignin =  e => {
		e.preventDefault()
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
			<div className="signin">
				<div className="signin__container">
				 <img src={whatsapp} alt=""/>
				 	<div className="form-container">
						<h1>Sauceflow</h1>
						<form>
							<div className="control">
								<label htmlFor="name">Email</label>
								<input value={signinUsername} onChange={this.getSigninUsername} type="text" name="name" id="name"/>
							</div>
							<div className="control">
								<label htmlFor="psw">Password</label>
								<input value={signinPassword} onChange={this.getSigninPassword} type="password" name="psw" id="psw"/>
							</div>
							<div className="control">
								<input type="submit" value="Login" onClick={this.onSubmitSignin}/>
							</div>
						</form>
						<div className="link">
							<div>Forgot Password</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}

export default Login;