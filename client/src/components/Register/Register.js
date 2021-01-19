import React, { useContext } from "react";
import { firebaseAuth } from "../../provider/AuthProvider";
import history from "../History";
import '../styles/register.css';


const Register = () => {

	const { handleSignup } = useContext(firebaseAuth)

	const submitRegister = e => {
		e.preventDefault()
		history.push('/admin')
	}
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
									<input type="text" name="owner__email" className="email" required/>
								</div>
							</div>
							<div className="password__container">
								<label className="field__label" htmlFor="owner__password">Password</label>
								<div className="password__container__input">
									<input type="password" name="owner__password" className="password" required/>
								</div>
							</div>
							<div className="submit__container">
								<button onClick={submitRegister} type="submit" className="button">Sign Up</button>
							</div>
					</div>
			</div>
		</div>
	)
}

export default Register;