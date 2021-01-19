import firebaseConfig, { auth } from "./firebase";


export const authMethods = {
	signup: (email, password, setErrors) => {
		auth.createUserWithEmailAndPassword(email, password)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				setErrors(prev => ([...prev, err.message]))
			})
	},
	signin: (email, password) => {

	},
	signout: (email, password) => {

	}
}