import React from "react";
import '../styles/register.css';

const Register2 = () => {
	return(
		<div className="register1__body">
			<p>Step 2 of 3</p>
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
						<label className="field__label" htmlFor="owner__number">Phone number</label>
						<div className="number__container">
							<input type="text" name="owner__number" className="number" required/>
						</div>
					</div>
				<div className="submit__container">
					<button type="submit" className="button">Next</button>
				</div>
			</div>
		</div>
	)
}

export default Register2; 