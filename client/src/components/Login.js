import React, { Component } from "react";
import history from "./History";
import "./styles/login.css"
import whatsapp from "./media/whatsapp.png";

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
			<div className="login">
				<form>
				  <div className="imgcontainer">
				    <img src={whatsapp} alt="Avatar" className="avatar"/>
				  </div>

				  <div className="container">
				    <label htmlFor="uname"><b>Username</b></label>
				    <input type="text" placeholder="Enter Username" name="uname" required/>

				    <label htmlFor="psw"><b>Password</b></label>
				    <input type="password" placeholder="Enter Password" name="psw" required/>
				        
				    <button type="submit">Login</button>
				    <label>
				      <input type="checkbox" checked="checked" name="remember"/> Remember me
				    </label>
				  </div>

				  <div className="container" style={{backgroundColor:'#f1f1f1'}}>
				    <button type="button" className="cancelbtn">Forgot Password</button>
				    {
				    	//<span className="psw">Forgot <a href="#">password?</a></span>
				}
				  </div>
				</form>
			</div>
		)
	}
	
}

export default Login;
// return(
// 			<div className="signin-container">
// 				<div className="login_box">
// 					<div className="signin-text">
// 						<p>Sign in to Sauceflow</p> 
// 					</div>
// 					<div className="signin-input">
// 						<input value={signinUsername} onChange={this.getSigninUsername} type="text" name="username" placeholder="username"/>
// 						<input value={signinPassword} onChange={this.getSigninPassword} type="password" name="password" placeholder="password"/>
// 					</div>
// 					<div className="login__area">
// 						<div className="login-button" onClick={this.onSubmitSignin}>Log in</div>
// 					</div>
// 				</div>
// 			</div>
// 		)