import React from "react";
import { Redirect, Switch, Route } from 'react-router-dom';
import Register1 from './Register-1';
import Register2 from './Register-2';
import Register3 from './Register-3';
import '../styles/register.css';


const Register = () => {
	return (
		<div>
			<p id="brand__name">Sauceflow</p>
			<div className="register__body">
				<Switch>
					<Route path="/register/step-1">
						<Register1 />
					</Route>
					<Route path="/register/step-2">
						<Register2 />
					</Route>
					<Route path="/register/step-3">
						<Register3 />
					</Route>
					<Redirect from="/register" to="/register/step-1" exact/>
				</Switch>
			</div>
		</div>
	)
}

export default Register;