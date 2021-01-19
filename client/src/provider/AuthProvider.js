import React from "react";
import { authMethods } from '../authmethods';
export const firebaseAuth = React.createContext();

const AuthProvider = ({ children }) => {

	const handleSignup = (email, password) => {
		return authMethods.signup(email, password)
	}

	return(
			<firebaseAuth.Provider value={{ handleSignup }}>
				{ children }
			</firebaseAuth.Provider>
		)
}

export default AuthProvider