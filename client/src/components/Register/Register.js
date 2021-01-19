import React, { Component } from "react";
//import history from "../History";
import '../styles/register.css';


class Register extends Component {

	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			error: null
		}
	}

	onEmailChange = e => {
		this.setState({
			email: e.target.value
		})
	}

	onPasswordChange = e => {
		this.setState({
			password: e.target.value
		})
	}

	submitRegister = () => {
		const { email, password } = this.state
		console.log(email, password)
		this.setState({
			email: "",
			password:""
		})
	}

	render() {
		const { email, password, error } = this.state
		const isInvalid = email === "" || password === ""
		return ( 
			<div className="register__container">  
				<p id="brand__name">Sauceflow</p>
				<div className="register__body">
					<div className="form__heading">
						<p>Register</p>
					</div>
						<div className="form__container">
								<div className="email__container">
									<label className="field__label" htmlFor="owner__email">Email</label>
									<div className="email__container__input">
										<input onChange={this.onEmailChange} value={email} type="text" name="email" className="email" required/>
									</div>
								</div>
								<div className="password__container">
									<label className="field__label" htmlFor="owner__password">Password</label>
									<div className="password__container__input">
										<input onChange={this.onPasswordChange} value={password} type="password" name="password" className="password" required/>
									</div>
								</div>
								<div className="submit__container">
									{ error && <p className="signup__error">{ error.message }</p> }
									<button disabled={isInvalid} onClick={this.submitRegister} type="submit" className="button">Sign Up</button>
								</div>
						</div>
				</div>
			</div>
		)
	}
}

export default Register;