import React, { Component } from "react";
import { withFirebase } from "../../firebase/index";
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from "../../session/index";
import history from "../History";
import "./passwordreset.css";

const PassworResetPage = () => (
	<div>
		<AuthUserContext.Consumer>
			{ authUser => <PasswordReset authUser={authUser}/> }
		</AuthUserContext.Consumer>
	</div>
)

const initialState = {
			password1:'',
			password2:'',
			error: null
		}

class PasswordResetFormBase extends Component {

	constructor() {
		super()
		this.state = { ...initialState }
	}

	onPasswordOneChange = e => {
		this.setState({
			password1: e.target.value
		})
	}

	onPasswordTwoChange = e => {
		this.setState({
			password2: e.target.value
		})
	}

	submitResetPassword = () => {
		const { password1, password2 } = this.state
		if (password2 !== password1) {
			this.setState({
				error: {
					message: "The passwords do not match!"
				}
			})
		} else {
			this.props.firebase.doPasswordUpdate(password2)
				.then(() => {
					this.setState({ ...initialState })
					console.log('current user is >>', this.props.authUser)
					//change status to active and loggedin to yes
					//history.push('/customers')
				})
				.catch(error => {
					this.setState({ error })
				})
		}
	}

	render() {
		const { password1, password2, error } = this.state
		const { authUser } = this.props
		const isInvalid = password1 === "" || password2 === ""
		authUser ? console.log('current user is >>', authUser.uid) : console.log('nobody resetting password')
		
		return(
			<div className="register__container">  
				<p id="brand__name">Sauceflow</p>
				<div className="register__body">
					<div className="form__heading">
						<p>Password Update</p>
					</div>
						<div className="form__container password__reset">
								<div className="password__container">
									<label className="field__label" htmlFor="owner__password">New Password</label>
									<div className="password__container__input">
										<input onChange={this.onPasswordOneChange} value={password1} type="password" name="password1" className="password1" required/>
									</div>
								</div>
								<div className="password__container">
									<label className="field__label" htmlFor="owner__password">Confirm New Password</label>
									<div className="password__container__input">
										<input onChange={this.onPasswordTwoChange} value={password2} type="password" name="password2" className="password2" required/>
									</div>
								</div>
								<div className="submit__container">
									{ error && <p className="signup__error">{ error.message }</p> }
									<button disabled={isInvalid} onClick={this.submitResetPassword} type="submit" className="button">Reset Password</button>
								</div>
						</div>
				</div>
			</div>
		)
	}
}

const PasswordReset = withRouter(withFirebase(PasswordResetFormBase))

export default PassworResetPage;

export { PasswordReset };