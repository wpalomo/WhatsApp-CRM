import React, { useContext } from "react";
import { firebaseAuth } from "../../provider/AuthProvider";
import history from "../History";
import '../styles/register.css';


const Register = () => {

	const { handleSignup, newUserInput, setNewUserInput, errors } = useContext(firebaseAuth)

	const submitRegister = e => {
		e.preventDefault()
		//history.push('/admin')
		console.log('Registered')
		handleSignup()
	}

	const handleChange = e => {
		const { name, value } = e.target
		setNewUserInput(prevState => ({ ...prevState, [name]: value }))	
	}

	return ( 
		<form onSubmit={submitRegister} className="register__container">  
			<p id="brand__name">Sauceflow</p>
			<div className="register__body">
				<div className="form__heading">
					<p>Register</p>
				</div>
					<div className="form__container">
							<div className="email__container">
								<label className="field__label" htmlFor="owner__email">Email</label>
								<div className="email__container__input">
									<input onChange={handleChange} value={newUserInput.email} type="text" name="email" className="email" required/>
								</div>
							</div>
							<div className="password__container">
								<label className="field__label" htmlFor="owner__password">Password</label>
								<div className="password__container__input">
									<input onChange={handleChange} value={newUserInput.password} type="password" name="password" className="password" required/>
								</div>
							</div>
							<div className="submit__container">
								{ errors.length > 0 ? errors.map((error, idx) => <p key={idx} style={{color: 'red'}}>{ error }</p>) : null }
								<button type="submit" className="button">Sign Up</button>
							</div>
					</div>
			</div>
		</form>
	)
}

export default Register;