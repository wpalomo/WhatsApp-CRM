import React, { Component } from "react";
import { withFirebase } from "../firebase/index";
import { withRouter } from 'react-router-dom';
import history from "./History";
import "./styles/login.css"
import whatsapp from './media/whatsapp.png';
import { db } from '../firebase.js';

const SignInPage = () => (
	<div>
		<SignIn />
	</div>
)

const initialState = {
			signinUsername:"",
			signinPassword:"",
			error: null
		}


class LoginFormBase extends Component { 

	constructor(props) {
		super(props)
		this.state = { ...initialState }
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

	// onSubmitSignin =  e => {
	// 	e.preventDefault()
	// 	const { signinUsername } = this.state;
	// 	const agentsRef = db.collection('agents')
	// 	//get the admins collection and check where the signin email is the saved email. if it does not exist, it's an agent
	// 	//if true, its an admin

	// 	//- change route to user if auth is true
	// 	//history.push('/customers')  or (/admin)
	// 	sessionStorage.setItem('aun', signinUsername)
	// 	//save the username 
	// 	agentsRef
	// 		.get()
	// 		.then(snapshot => {
	// 			let loggedIn = snapshot.docs.map(doc => {
	// 				return {id:doc.id, data:doc.data()}
	// 			}).filter(obj => (obj.data.loggedin === 'yes' && obj.data.agentname === signinUsername))
	// 			if(loggedIn) {
	// 				let user = loggedIn[0].id
	// 				sessionStorage.setItem('aid', user)
	// 				history.push('/customers') 
	// 			}
	// 		})
		

	// 	//clear the form
	// 	this.setState({
	// 		signinUsername:"",
	// 		signinPassword:""
	// 	})
	// }

	onSubmitSignin =  e => {
		e.preventDefault()
		const { firebase } = this.props
		const { signinUsername, signinPassword } = this.state
		let adminRef = db.collection('admins');
		firebase.doSignInWithEmailAndPassword(signinUsername, signinPassword)
				.then(async (user) => {
					let currentUser = user.user.uid
					//check the admin collection if the currentUser is there
					let thisUser = await adminRef.where('adminId', '==', currentUser).get()
					if (thisUser.length === 0) {//agent
						console.log('this is an agent')
					} else {//admin
						history.push('/admin') 
					}
					//clear the form
					this.setState({ ...initialState })
				})
				.catch(error => {
					this.setState({ error })
				})
	}

	
 
	render() {
		const { signinUsername, signinPassword, error } = this.state
		const isInvalid = signinUsername === "" || signinPassword === "" 
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
								{ error && <p className="error__message">{ error.message }</p> }
								<input disabled={isInvalid} type="submit" value="Login" onClick={this.onSubmitSignin}/>
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

const SignIn = withRouter(withFirebase(LoginFormBase))

export default SignInPage;

export { SignIn };