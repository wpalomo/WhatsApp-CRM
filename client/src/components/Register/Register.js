import React from "react";
import history from "../History";
import '../styles/register.css';


const Register = () => {
	const submitRegister = e => {
		e.preventDefault()
		history.push('/admin')
		//send a email to confirm the submitted email address
	}
	return ( 
		<div>
			<p id="brand__name">Sauceflow</p>
			<div className="register__body">
				<div className="register1__body">
					<p>Register</p>
					<div className="form__container">
						<div className="owner__names">
							<div className="firstname__input">
								<label className="field__label" htmlFor="owner__fn">First name</label>
								<div className="firstname__container">
									<input type="text" name="owner__fn" className="first__name" required/>
								</div>
							</div>
							<div className="lastname__input">
								<label className="field__label" htmlFor="owner__ln">Last name</label>
								<div className="lastname__container">
									<input type="text" name="owner__ln" className="last__name" required/>
								</div>
							</div>
						</div>
						<div className="phonenumber__input">
								<label className="field__label" htmlFor="owner__number">Email</label>
								<div className="number__container">
									<input type="text" name="owner__number" className="number" required/>
								</div>
							</div>
							<div className="phonenumber__input">
								<label className="field__label" htmlFor="owner__number">Company</label>
								<div className="number__container">
									<input type="text" name="owner__number" className="number" required/>
								</div>
							</div>
							<div className="phonenumber__input">
								<label className="field__label" htmlFor="owner__number">Phone number</label>
								<div className="number__container">
									<input type="text" name="owner__number" className="number" required/>
								</div>
							</div>
						<div className="submit__container">
							<button onClick={submitRegister} type="submit" className="button">Sign Up</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register;