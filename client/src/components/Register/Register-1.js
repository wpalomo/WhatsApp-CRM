import React from "react";

const Register1 = () => {
	return (
		<div className="register1__body">
			<p>Step 1 of 3</p>
			<div className="form__container">
				<div className="email__input">
					<label className="field__label" htmlFor="owner__email">Company email</label>
					<div className="email__container">
						<input type="email" name="owner__email" className="email" required/>
					</div>
				</div>
				<div className="submit__container">
					<button type="submit" className="button">
						Next
					</button>
				</div>
			</div>
		</div>
	)
}

export default Register1;