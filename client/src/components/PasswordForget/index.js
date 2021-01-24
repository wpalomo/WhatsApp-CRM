import React, { Component } from "react";
import { withFirebase } from "../../firebase/index";
import { withRouter } from 'react-router-dom';
// import { AuthUserContext } from "../../session/index";
// import { db } from "../../firebase";
import history from "../History";

const PasswordForgetPage = () => (
	<div>
		<PasswordForgetForm /> 
	</div>
)

const initialState = {
	email:'',
	error: null
}

class PasswordForgetFormBase extends Component {

	constructor() {
		super()
		this.state = { ...initialState }
	}

	onEmailChange = e => {
		this.setState({
			email: e.target.value
		})
	}


	submitResetPassword = () => {
		const { email } = this.state
		this.props.firebase.doPasswordReset(email)
				.then(() => {
					history.push('/login')
					this.setState({ ...initialState })
				})
				.catch(error => {
					this.setState({ error })
				})
	}

	render() {
		const { email, error } = this.state
		const isInvalid = email === ""
		
		return(
			<div className="register__container">  
				<p id="brand__name">Sauceflow</p>
				<div className="register__body password__reset">
					<div className="form__heading">
						<p>Get new password</p>
					</div>
						<div className="form__container">
								<div className="email__container">
									<label className="field__label" htmlFor="owner__email">Email Address</label>
									<div className="email__container__input">
										<input onChange={this.onEmailChange} value={email} type="email" name="email" className="email"/>
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

const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase))

export default PasswordForgetPage;

export { PasswordForgetForm };