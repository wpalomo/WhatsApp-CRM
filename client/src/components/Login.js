import React, { Component } from "react";
import history from "./History";
import "./styles/login.css"
import whatsapp from './media/whatsapp.png';
import { db } from '../firebase.js';

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
		const agentsRef = db.collection('agents')
		//get the admins collection and check where the signin email is the saved email. if it does not exist, it's an agent
		//if true, its an admin

		//- change route to user if auth is true
		//history.push('/customers')  or (/admin)
		sessionStorage.setItem('aun', signinUsername)
		//save the username 
		agentsRef
			.get()
			.then(snapshot => {
				let loggedIn = snapshot.docs.map(doc => {
					return {id:doc.id, data:doc.data()}
				}).filter(obj => (obj.data.loggedin === 'yes' && obj.data.agentname === signinUsername))
				if(loggedIn) {
					let user = loggedIn[0].id
					sessionStorage.setItem('aid', user)
					history.push('/customers') 
				}
			})
		

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
								<input value={signinUsername} onChange={this.getSigninUsername} type="text" name="name" id="name" placeholder="Email address"/>
							</div>
							<div className="control">
								<label htmlFor="psw">Password</label>
								<input value={signinPassword} onChange={this.getSigninPassword} type="password" name="psw" id="psw" placeholder="Password"/>
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